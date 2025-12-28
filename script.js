const BACKEND_URL = "https://oluwa-timileyin-radio-backend-jgwk.onrender.com";

const player = document.getElementById("radioPlayer");
const statusText = document.getElementById("status");

async function loadRadio() {
  try {
    const res = await fetch(`${BACKEND_URL}/music/list`);
    const tracks = await res.json();

    if (!tracks || tracks.length === 0) {
      statusText.textContent = "No audio uploaded yet";
      return;
    }

    // Play first audio (continuous streaming will come later)
    player.src = BACKEND_URL + tracks[0];
    player.play();

    statusText.textContent = "Now Playing 🎶";

  } catch (err) {
    statusText.textContent = "Backend not reachable";
    console.error(err);
  }
}

loadRadio();
