/* ---------- CONFIG ---------- */
const backendUrl = "https://oluwa-timileyin-radio-backend-jgwk.onrender.com";

/* ---------- PLAYLIST (Auto-play Multiple Audios) ---------- */
const playlistDiv = document.getElementById("playlist");

async function loadPlaylist() {
  const res = await fetch(`${backendUrl}/music/list`);
  const audios = await res.json();

  playlistDiv.innerHTML = "";
  audios.forEach(src => {
    const audioEl = document.createElement("audio");
    audioEl.src = backendUrl + src;
    audioEl.controls = true;
    audioEl.autoplay = true;
    audioEl.loop = true;
    playlistDiv.appendChild(audioEl);
  });
}

/* Auto-refresh playlist every 30s */
loadPlaylist();
setInterval(loadPlaylist, 30000);

/* ---------- LIVE MIC (B) ---------- */
let micEnabled = false;
let micSocket;

async function startMic() {
  if (micEnabled) return;

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    micSocket = new WebSocket(`wss://${window.location.host}/mic`);

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createMediaStreamSource(stream);
    const processor = audioCtx.createScriptProcessor(4096, 1, 1);

    source.connect(processor);
    processor.connect(audioCtx.destination);

    processor.onaudioprocess = e => {
      const input = e.inputBuffer.getChannelData(0);
      const buffer = new Float32Array(input);
      if (micSocket.readyState === WebSocket.OPEN) micSocket.send(buffer);
    };

    micEnabled = true;
    alert("Mic broadcasting started!");
  } catch (err) {
    console.error("Mic error:", err);
    alert("Cannot access microphone.");
  }
}

/* ---------- RECEIVE LIVE MIC ---------- */
const micPlayer = new Audio();
micPlayer.autoplay = true;

const micStreamSocket = new WebSocket(`wss://${window.location.host}/mic`);
micStreamSocket.onmessage = e => {
  const audioData = new Float32Array(e.data);
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const buffer = audioCtx.createBuffer(1, audioData.length, audioCtx.sampleRate);
  buffer.copyToChannel(audioData, 0);
  const source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.connect(audioCtx.destination);
  source.start();
};
