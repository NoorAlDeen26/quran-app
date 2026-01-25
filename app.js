const cover = document.getElementById("coverScreen");
const app = document.getElementById("mainApp");
const audio = document.getElementById("audio");
const reciter = document.getElementById("reciter");

const reciters = {
  basit: "https://server7.mp3quran.net/basit/001.mp3",
  afasy: "https://server8.mp3quran.net/afs/001.mp3"
};

cover.addEventListener("click", () => {
  cover.classList.add("hidden");
  app.classList.remove("hidden");
  loadAudio();
});

reciter.addEventListener("change", loadAudio);

function loadAudio() {
  audio.src = reciters[reciter.value];
  audio.load();
}
