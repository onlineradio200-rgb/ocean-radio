const BACKEND_URL = "https://oluwa-timileyin-radio-backend-jgwk.onrender.com";
const player = document.getElementById("radioPlayer");
const statusText = document.getElementById("status");

let currentTrack = 0;
let tracks = [];

async function loadRadio() {
  try {
    const res = await fetch(`${BACKEND_URL}/music/list`);
    tracks = await res.json();

    if (!tracks || tracks.length === 0) {
      statusText.textContent = "No audio uploaded yet";
      return;
    }

    statusText.textContent = "Starting Radio...";
    playTrack(currentTrack);

  } catch (err) {
    statusText.textContent = "Backend not reachable";
    console.error(err);
  }
}

function playTrack(index) {
  if (tracks.length === 0) return;

  player.src = BACKEND_URL + tracks[index];
  player.play();
  statusText.textContent = `Now Playing: ${tracks[index].split("/").pop()}`;

  // When track ends, play next one
  player.onended = () => {
    currentTrack = (currentTrack + 1) % tracks.length; // Loop back to first
    playTrack(currentTrack);
  };
}

loadRadio();
