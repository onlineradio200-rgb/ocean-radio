body {
  font-family: 'Arial', sans-serif;
  background-color: #0b0b0f;
  color: #fff;
  margin: 0;
  padding: 0;
}

.app-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

header h1 {
  font-size: 2em;
  color: #00d4ff;
}

header p {
  font-size: 1em;
  color: #aaa;
}

button {
  padding: 10px 20px;
  margin: 5px;
  background: #00d4ff;
  border: none;
  color: #000;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background: #00a3cc;
}

/* Wave animation canvas */
.wave-container {
  position: relative;
  width: 100%;
  height: 50px;
  margin: 15px 0;
}

canvas#wave {
  width: 100%;
  height: 100%;
  display: block;
}

/* Playlist styling */
ul#playlist {
  list-style: none;
  padding: 0;
}

ul#playlist li {
  padding: 8px;
  margin: 4px 0;
  background-color: #111;
  cursor: pointer;
  border-radius: 5px;
}

ul#playlist li:hover {
  background-color: #00d4ff;
  color: #000;
}
