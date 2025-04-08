import 'dotenv/config';
import {
  App
} from '@tinyhttp/app';
import {
  logger
} from '@tinyhttp/logger';
import {
  Liquid
} from 'liquidjs';
import sirv from 'sirv';
import axios from 'axios';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

const getSpotifyToken = async () => {
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error fetching Spotify token:', error);
    return null;
  }
};



const getArtistImage = async (artistId, token) => {
  try {
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("data:", data); // ← hier kun je checken wat Spotify teruggeeft

    if (data.images && data.images.length > 0) {
      return data.images[0].url;
    }

    return null;
  } catch (error) {
    console.error(`Error fetching image for artist ${artistId}:`, error);
    return null;
  }
};

const getFeaturedArtists = async () => {
  const token = await getSpotifyToken();
  if (!token) return [];

  try {
    const response = await axios.get('https://api.spotify.com/v1/browse/new-releases', {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });

    const albums = response.data.albums.items;
    const artists = albums.flatMap(album => album.artists);
    const uniqueArtists = Array.from(new Map(artists.map(artist => [artist.id, artist])).values());

    // Use Promise.all to fetch all artist images in parallel
    const formattedArtists = await Promise.all(uniqueArtists.map(async (artist) => {
      const image = await getArtistImage(artist.id, token);
      console.log(`Artist: ${artist.name}, Image: ${image}`);
      return {
        id: artist.id,
        name: artist.name,
        image: image,
      };
    }));

    return formattedArtists;
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
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    const artist = response.data;

    return res.send(renderTemplate('server/views/detail.liquid', {
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
