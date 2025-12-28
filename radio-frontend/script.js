const BACKEND = "https://oluwa-timileyin-radio-backend-jgwk.onrender.com";

const player = document.getElementById("player");
const statusText = document.getElementById("status");

fetch(`${BACKEND}/music/list`)
  .then(res => res.json())
  .then(list => {
    if (!list.length) {
      statusText.textContent = "No audio uploaded yet";
      return;
    }

    player.src = BACKEND + list[0];
    player.play();

    statusText.textContent = "Now Playing 🎶";
  })
  .catch(err => {
    statusText.textContent = "Radio offline";
    console.error(err);
  });
