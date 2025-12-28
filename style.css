const audio = document.getElementById("audio-player");
const canvas = document.getElementById("wave");
const ctx = canvas.getContext("2d");

let playlist = [];
let currentTrackIndex = 0;

/* ---------- Setup Canvas ---------- */
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

/* ---------- Audio Context ---------- */
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();
const source = audioCtx.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioCtx.destination);
analyser.fftSize = 256;

const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

/* ---------- Draw Wave ---------- */
function drawWave() {
  requestAnimationFrame(drawWave);
  analyser.getByteFrequencyData(dataArray);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00d4ff";
  const barWidth = (canvas.width / bufferLength) * 2.5;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    const barHeight = dataArray[i] / 2;
    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
    x += barWidth + 1;
  }
}

/* ---------- Playlist Controls ---------- */
const playlistEl = document.getElementById("playlist");
const refreshBtn = document.getElementById("refresh-btn");

async function loadPlaylist() {
  const res = await fetch("/music/list");
  playlist = await res.json();
  renderPlaylist();
  if (playlist.length > 0) playTrack(0);
}

function renderPlaylist() {
  playlistEl.innerHTML = "";
  playlist.forEach((track, i) => {
    const li = document.createElement("li");
    li.textContent = track.split("/").pop();
    li.onclick = () => playTrack(i);
    playlistEl.appendChild(li);
  });
}

function playTrack(index) {
  currentTrackIndex = index;
  audio.src = playlist[index];
  audio.play();
}

/* Auto-play next */
audio.addEventListener("ended", () => {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  playTrack(currentTrackIndex);
});

/* Refresh Playlist */
refreshBtn.onclick = loadPlaylist;

/* ---------- Start Drawing ---------- */
drawWave();

/* ---------- Initialize ---------- */
loadPlaylist();
