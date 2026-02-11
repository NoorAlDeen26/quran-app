const surahSelect = document.getElementById("surahSelect");
const reciterSelect = document.getElementById("reciterSelect");
const quranText = document.getElementById("quranText");
const audioPlayer = document.getElementById("audioPlayer");
const playBtn = document.getElementById("playBtn");

for (let i = 1; i <= 114; i++) {
let option = document.createElement("option");
option.value = i;
option.textContent = "Surah " + i;
surahSelect.appendChild(option);
}

async function loadSurah(number) {
quranText.innerHTML = "Loading...";

const response = await fetch(`https://api.alquran.cloud/v1/surah/${number}/quran-uthmani`);
const data = await response.json();
const ayahs = data.data.ayahs;

quranText.innerHTML = "";

ayahs.forEach(ayah => {
let span = document.createElement("span");
span.innerHTML = `${ayah.text} <span class="ayah-number">${ayah.numberInSurah}</span> `;
quranText.appendChild(span);
});

updateAudio(number);
}

function updateAudio(number) {
let formatted = number.toString().padStart(3, "0");
let reciter = reciterSelect.value;

let servers = {
"abdul_basit_murattal": `https://server8.mp3quran.net/abdul_basit_murattal/${formatted}.mp3`,
"afs": `https://server8.mp3quran.net/afs/${formatted}.mp3`,
"sudais": `https://server8.mp3quran.net/sudais/${formatted}.mp3`,
"shuraym": `https://server8.mp3quran.net/shuraym/${formatted}.mp3`,
"minshawi": `https://server8.mp3quran.net/minshawi/${formatted}.mp3`
};

audioPlayer.src = servers[reciter];
}

playBtn.addEventListener("click", () => {
audioPlayer.play();
});

surahSelect.addEventListener("change", () => {
loadSurah(surahSelect.value);
});

reciterSelect.addEventListener("change", () => {
updateAudio(surahSelect.value);
});

loadSurah(1);
