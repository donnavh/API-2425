import './index.css';

console.log('Hello, world!');


const buttons = document.querySelectorAll('.add-playlist-button');

buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    const trackId = e.target.dataset.id; // Use the correct data attribute
    addToPlaylist(trackId);
  });
});

function addToPlaylist(id) {
  console.log('Adding to playlist:', id);
  const playlist = JSON.parse(localStorage.getItem('playlist')) || [];
  if (!playlist.includes(id)) {
    playlist.push(id);
    localStorage.setItem('playlist', JSON.stringify(playlist));
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

