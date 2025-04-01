import 'dotenv/config';
import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import { Liquid } from 'liquidjs';
import sirv from 'sirv';
import axios from 'axios';
 
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
 
const getSpotifyToken = async () => {
  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({ grant_type: 'client_credentials' }).toString(),
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching Spotify token:', error);
    return null;
  }
};
 
const getFeaturedArtists = async () => {
  const token = await getSpotifyToken();
  if (!token) return [];
 
  try {
    const response = await axios.get('https://api.spotify.com/v1/browse/new-releases', {
      headers: { Authorization: `Bearer ${token}` },
    
    });
    const albums = response.data.albums.items;
    const artists = albums.flatMap(album => album.artists);
    const uniqueArtists = Array.from(new Map(artists.map(artist => [artist.id, artist])).values());
    return uniqueArtists.map(artist => ({
      id: artist.id,
      name: artist.name,
      image: artist.images?.length ? artist.images[0].url : null
    }));
  } catch (error) {
    console.error('Error fetching featured artists:', error);
    return [];
  }
};
 
const engine = new Liquid({
  extname: '.liquid',
});
 
const app = new App();
 
app
  .use(logger())
  .use('/', sirv('dist'))
  .listen(3000, () => console.log('Server available on http://localhost:3000'));
 
app.get('/', async (req, res) => {
  const artists = await getFeaturedArtists();
 

  // return res.json(artists);
  return res.send(renderTemplate('server/views/index.liquid', {
    title: 'Featured Artists',
    artists
  }));
});
 
app.get('/artist/:id', async (req, res) => {
  const artistId = req.params.id;
  const token = await getSpotifyToken();
  if (!token) return res.status(500).send('Error fetching token');
 
  try {
    const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const artist = response.data;
 
    return res.send(renderTemplate('server/views/artist.liquid', {
      title: artist.name,
      artist: {
        name: artist.name,
        genres: artist.genres.join(', '),
        followers: artist.followers.total,
        popularity: artist.popularity,
        image: artist.images.length ? artist.images[0].url : null,
      }
    }));
  } catch (error) {
    console.error('Error fetching artist data:', error);
    return res.status(404).send('Artist not found');
  }
});
 
const renderTemplate = (template, data) => {
  const templateData = {
    NODE_ENV: process.env.NODE_ENV || 'production',
    ...data
  };
  return engine.renderFileSync(template, templateData);
};