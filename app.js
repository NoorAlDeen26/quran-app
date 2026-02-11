const surahSelect = document.getElementById("surahSelect");
const reciterSelect = document.getElementById("reciterSelect");
const quranText = document.getElementById("quranText");
const audioPlayer = document.getElementById("audioPlayer");
const playBtn = document.getElementById("playBtn");

let ayahsData = [];
let currentAyahIndex = 0;
let isPlaying = false;

// Load Surah List
for (let i = 1; i <= 114; i++) {
let option = document.createElement("option");
option.value = i;
option.textContent = "Surah " + i;
surahSelect.appendChild(option);
}

async function loadSurah(number) {
quranText.innerHTML = "Loading...";
currentAyahIndex = 0;

const response = await fetch(`https://api.alquran.cloud/v1/surah/${number}/quran-uthmani`);
const data = await response.json();

ayahsData = data.data.ayahs;

quranText.innerHTML = "";

ayahsData.for
