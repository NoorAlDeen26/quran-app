alert("JS LOADED");
const surahSelect = document.getElementById("surahSelect");
const quranText = document.getElementById("leftPage");
const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const reciterSelect = document.getElementById("reciterSelect");


let playlist = [];
let currentIndex = 0;

// Load Surah list
fetch("https://api.quran.com/api/v4/chapters")
  .then(res => res.json())
  .then(data => {
    data.chapters.forEach(ch => {
      const option = document.createElement("option");
      option.value = ch.id;
      option.textContent = `${ch.id}. ${ch.name_arabic}`;
      surahSelect.appendChild(option);
    });
    loadSurah(1);
  });

surahSelect.addEventListener("change", () => {
  loadSurah(surahSelect.value);
});

function loadSurah(id) {
  fetch(`https://api.quran.com/api/v4/verses/by_chapter/${id}?fields=text_uthmani`)
    .then(res => res.json())
    .then(data => {
      const leftPage = document.getElementById("leftPage");
      const rightPage = document.getElementById("rightPage");

      leftPage.innerHTML = "";
      rightPage.innerHTML = "";

      data.verses.forEach((v, i) => {
        const ayah = document.createElement("div");
        ayah.className = "ayah";
        ayah.textContent = v.text_uthmani;

        if (i % 2 === 0) {
          leftPage.appendChild(ayah);
        } else {
          rightPage.appendChild(ayah);
        }
      });
    });
}


// AUDIO
 playBtn.addEventListener("click", async () => {
  const surah = surahSelect.value || 1;
  let reciter = reciterSelect.value;

  try {
    let res = await fetch(
      `https://api.alquran.cloud/v1/surah/${surah}/${reciter}`
    );
    let data = await res.json();

    let audios = data.data.ayahs.map(a => a.audio).filter(Boolean);

    // Fallback if audio missing
    if (audios.length === 0) {
      alert("Selected reciter unavailable. Switching to Abdul Basit.");
      reciterSelect.value = "ar.abdulbasitmurattal";

      res = await fetch(
        `https://api.alquran.cloud/v1/surah/${surah}/ar.abdulbasitmurattal`
      );
      data = await res.json();
      audios = data.data.ayahs.map(a => a.audio);
    }

    playlist = audios;
    currentIndex = 0;
    playNext();

  } catch (e) {
    alert("Audio failed. Please try again.");
    console.error(e);
  }
});

const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const reciterSelect = document.getElementById("reciterSelect");
const surahSelect = document.getElementById("surahSelect");

playBtn.addEventListener("click", () => {
  const reciter = reciterSelect.value;
  const surah = String(surahSelect.value).padStart(3, "0");

  audio.src = `https://everyayah.com/data/${reciter}/${surah}001.mp3`;
  audio.play();
});
