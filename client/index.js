import './index.css';

console.log('Hello, world!');


const buttons = document.querySelectorAll('.add-playlist-button');

buttons.forEach(button => {
  // koppelt de buttons aan een actie om toe te voegen aan de playlist
  button.addEventListener('click', (e) => {
    const trackId = e.target.dataset.id; // Use the correct data attribute
    addToPlaylist(trackId);
    // voegt de trackid toe aan de functie voor de addtoplaylist
  });
});

function addToPlaylist(id) {
  // sends an id to the playlist/ server
  console.log('Adding to playlist:', id);
  const playlist = JSON.parse(localStorage.getItem('playlist')) || [];
  // haalt de huidige playlist op en als deze nog leeg is, een nieuwe lege array

  if (!playlist.includes(id)) {
    playlist.push(id);
    localStorage.setItem('playlist', JSON.stringify(playlist));
    //kijken of het nummer er al in zit en anders word hij toegevoegd


    // stuurt de id naar de server via een post request 
    fetch(`/api/playlist/${id}`, {
      method: 'POST'
    })
    .then(res => res.json())
    .then(data => console.log('✅ Server saved playlist:', data))
    .catch(err => console.error('❌ Error saving to server:', err));
  }
}

var playlistLink = document.querySelector('.playlistlink');

if (playlistLink){
    playlistLink.addEventListener('click', (e) =>{
        goToPlaylistPage();
    })
}

function goToPlaylistPage() {
    let playlist = JSON.parse(localStorage.getItem('playlist')) || [];
   
    // Filter out null/undefined/empty
    playlist = playlist.filter(id => id);
   
    if (playlist.length === 0) {
      alert("No tracks yet!");
      return;
    }
   
    const query = playlist.join(',');
    window.location.href = `/playlist?ids=${query}`;
  }



  document.querySelectorAll('.card__link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Get the href attribute from the link itself
      const targetUrl = link.getAttribute('href');
      
      if (document.startViewTransition) {
        document.startViewTransition(() => {
          window.location.href = targetUrl;
        });
      } else {
        window.location.href = targetUrl;
      }
    });
  });