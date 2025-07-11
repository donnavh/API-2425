import 'dotenv/config';
import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import { Liquid } from 'liquidjs';
import sirv from 'sirv';
import fetch from 'node-fetch';
import { LocalStorage } from 'node-localstorage'; 
// gegevens worden op de server opgeslagen 

// import { json } from '@tinyhttp/body';



const localStorage = new LocalStorage('./playlist');
// maakt de map playlist waar het playlist bestand instaat, op de server


const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

const app = new App();

// eerst token ophalen
// API call doen
// checken of het goed ging
// data eruit halen
// formatteren en terug geven aan de pagina




// om liquid bestanden te renderen 
const engine = new Liquid({
  extname: '.liquid',
});

// refresht de spotify token elke keer 
const getSpotifyToken = async () => {
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
      }).toString(),
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


// haalt de populairste nummers van een artiest op
const getTopTracks = async (artistId, countryCode) => {
  const token = await getSpotifyToken();
  if (!token) return [];

  // stuurt een get request naar de api om de top tracks van de artiest te verkrijgen
  try {
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=${countryCode}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.tracks || [];
  } catch (error) {
    console.error('Error fetching top tracks:', error);
    return [];
  }
};


// haalt de lijst op van algemene artiesten met genres en populariteit 
const getAllArtists = async (limit) => {
  // eerst checken of de spotify token het doet, anders kan er helemaal niks gebeuremn
  const token = await getSpotifyToken();
  if (!token) return [];

  try {
    // stuur een verzoek naar spotify search api om door artiesten heen te zoeken, q=genre om alle genres te pakken
    const response = await fetch(`https://api.spotify.com/v1/search?q=genre:*&type=artist&limit=${limit}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      // als er een fout is komt er een eror in zodat we dat later kunnen opvangen 
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // zet het antwoord van spotify om in een json form
    const artists = data.artists.items;
    // pak hieruit de lijst met artiesten

    const formattedArtists = await Promise.all(artists.map(async (artist) => {
      // format de lijst in een nieuw object om allen te krijgen wat je echt nodig hebt
      return {
        id: artist.id,
        name: artist.name,
        image: artist.images && artist.images.length > 0 ? artist.images[0].url : null,
        genres: artist.genres,
        popularity: artist.popularity
      };
    }));

    return formattedArtists;
    // als alles goed gaat krijg je de geformatteerde lijst terug, anders tonen ze een error en krijg je een lege lijst terug
  } catch (error) {
    console.error('Error fetching all artists:', error);
    return [];
  }
};


// haalt de afbeeldingen van de artiesen op
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

    if (data.images && data.images.length > 0) {
      return data.images[0].url;
    }

    return null;
  } catch (error) {
    console.error(`Error fetching image for artist ${artistId}:`, error);
    return null;
  }
};

// haalt nieuwe albums op en de artisten hiervan
const getFeaturedArtists = async () => {
  const token = await getSpotifyToken();
  if (!token) return [];

  try {
    const response = await fetch('https://api.spotify.com/v1/browse/new-releases', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const albums = data.albums.items;
    const artists = albums.flatMap(album => album.artists);
    const uniqueArtists = Array.from(new Map(artists.map(artist => [artist.id, artist])).values());

    const formattedArtists = await Promise.all(uniqueArtists.map(async (artist) => {
      const image = await getArtistImage(artist.id, token);
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




// liquid template renderen 
// wordt gebruikt om de html op te bouwen
const renderTemplate = (template, data) => {
  const templateData = {
    NODE_ENV: process.env.NODE_ENV || 'production',
    ...data
  };
  return engine.renderFileSync(template, templateData);
};



// bepaald de routes voor de pagina's die de gebruiker te zien krijgt 
app
  .use(logger())
  // logt alle requests
  .use('/', sirv('dist'))
  // Servert CSS/JS/afbeeldingen uit de 'dist' map
  .get('/', async (req, res) => {
    const artists = await getFeaturedArtists();

    return res.send(renderTemplate('server/views/index.liquid', {
      title: 'Featured Artists',
      artists
    }));
  })
  .get('/all-artists', async (req, res) => {
    const limit = req.query.limit || 20
    const artists = await getAllArtists(limit);
    console.log(artists)
    return res.send(renderTemplate('server/layouts/all-artists/all-artists.liquid', {
      title: 'All Artists',
      artists
    }));
  })
  .get('/top-tracks/:artistId', async(req, res) =>{
    // geeft toptacks terug in de vorm van JSON voor een specifieke artiest
    const { artistId = '' } = req.params;
    const countryCode = req.query.country || 'NL';

    try{
      const tracks = await getTopTracks(artistId, countryCode);
      res.json(tracks);
      console.log(tracks);
    } catch(error){
      console.error('Error fetching top tracks in /top-tracks route:', error);
      res.status(500).json({error: 'Failed to fetch top tracks'});
    }
  })
  .get('/artist/:id', async (req, res) => {
    // get requestr naar de pagina 
    // toont de detailpagina van een artiest 
    // wanneer de detailpagina wordt geopend word de functie uitgevoerd
    const artistId = req.params.id;
    // haalt het id gedeelte uit de url op
    const countryCode = 'NL'
    const token = await getSpotifyToken();
    if (!token) return res.status(500).send('Error fetching token');

    try {
      // get verzoek doen naar de spotify api om de info op te halen van deze artiest 
      const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        // fout/ error handling
        if (response.status === 404) {
          return res.status(404).send('Artist not found');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const artist = await response.json();
      // omzetten in json

      return res.send(renderTemplate('server/views/detail.liquid', {
        // stuurt de gegevens naar de detail pagina 
        title: artist.name,
        artist: {
          name: artist.name,
          genres: artist.genres.join(', '),
          followers: artist.followers.total,
          popularity: artist.popularity,
          image: artist.images.length ? artist.images[0].url : null,
        },
    topTracks: await getTopTracks(artistId, countryCode),
    //geef hier zowel artiesten info mee zowel als de toptracks 
        
      }));

    } catch (error) {
      console.error('Error fetching artist data:', error);
      return res.status(500).send('Server error');
    }
  })
  .get('/playlist', async (req, res) => {
      // Haalt de opgeslagen track-ID’s op
  // Voor elke ID vraagt hij de track-informatie op bij Spotify
  // Stuurt die gegevens naar een template om te renderen op de pagina
  
    const ids = getPlaylist();
    // haalt de track ids op die in de server zijn opgeslagen
  
    if (!ids.length) {
      return res.send(renderTemplate('server/views/playlist.liquid', {
        title: 'Playlist',
        items: []
      }));
    }
    // als het leeg is krijg je een melding
  
    const token = await getSpotifyToken(); // ← Zorg dat je een geldige token krijgt
    if (!token) return res.status(500).send('No token');
  
    const items = [];
  
    for (const id of ids) {
      const response = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
      
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // voor elke opgeslagen id een api verzoek om de volledige trackinformatie op te halen
  
      if (!response.ok) {
        console.error(`Error fetching track ${id}:`, response.status);
        continue;
      }
  
      const track = await response.json();
      items.push(track);
      // alleen tracks opslaan waarbij het ophalen goed ging
    }
  
    // wanneer alles klaar is lijst met tracks naar de pagina sturen
    return res.send(renderTemplate('server/views/playlist.liquid', {
      title: 'Playlist',
      items
    }));
  });
  

// local storage

function getPlaylist() {
// leest de playlist uit het lokale bestand van de server
  const playlist = JSON.parse(localStorage.getItem('playlist') || '[]');
  
  console.log('Fetched playlist:', playlist); // Log fetched playlist
  return playlist;
}

function savePlaylist(playlist) {
  // slaat de array van track ids op
  console.log('💾 Saving to NODE localStorage:', playlist);
  localStorage.setItem('playlist', JSON.stringify(playlist));
}

app.post('/api/playlist/:id', async (req, res) => {
   // Controleert of track al in de playlist staat, anders wordt hij toegevoegd
  // Wordt aangeroepen vanaf de client met fetch()
  const id = req.params.id;
  let playlist = getPlaylist();

  if (!playlist.includes(id)) {
    playlist.push(id);
    savePlaylist(playlist);
  }
  return res.json({ status: 'added', playlist });
  
});
app.post('/api/playlist', (req, res) => {
  // post request 
  const { tracks } = req.body;

  if (!Array.isArray(tracks)) {
    return res.status(400).json({ error: 'Invalid playlist data' });
  }

  savePlaylist(tracks);
  return res.json({ status: 'playlist saved', playlist: tracks });
});





// Start server
app.listen(3000, () => console.log('Server available on http://localhost:3000'));