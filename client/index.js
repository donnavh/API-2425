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

