const surahSelect = document.getElementById("surahSelect");
const quranText = document.getElementById("quranText");
const reciterSelect = document.getElementById("reciterSelect");
reciterSelect.addEventListener("change", () => {
  loadSurah(surahSelect.value);
});

// Load Surah list
fetch("https://api.quran.com/api/v4/chapters")
  .then(res => res.json())
  .then(data => {
    data.chapters.forEach(ch => {
      const option = document.createElement("option");
      option.value = ch.id;
      option.textContent = `${ch.id}. ${ch.name_simple} - ${ch.name_arabic}`;
      surahSelect.appendChild(option);
    });
    loadSurah(1);
  });

surahSelect.addEventListener("change", () => {
  loadSurah(surahSelect.value);
});

function loadSurah(id) {
  quranText.innerHTML = "";

  fetch(`https://api.quran.com/api/v4/verses/by_chapter/${id}?fields=text_uthmani`)
    .then(res => res.json())
    .then(data => {
      data.verses.forEach(v => {
        const ayah = document.createElement("div");
        ayah.className = "ayah";
        ayah.textContent = v.text_uthmani;
        quranText.appendChild(ayah);
      });
    });

  // Abdul Basit (reliable source)
const reciter = reciterSelect.value;
}

const playBtn = document.getElementById("playBtn");
const reciterSelect = document.getElementById("reciterSelect");

let playlist = [];
let currentIndex = 0;

playBtn.addEventListener("click", async () => {
  const surahNumber = surahSelect.value || 1;
  const reciter = reciterSelect.value;

  try {
    const res = await fetch(
      `https://api.alquran.cloud/v1/surah/${surahNumber}/${reciter}`
    );
    const json = await res.json();

    playlist = json.data.ayahs.map(a => a.audio);
    currentIndex = 0;

    playNext();
  } catch (e) {
    alert("Audio source failed.");
    console.error(e);
  }
});

function playNext() {
  if (currentIndex >= playlist.length) return;

  audio.src = playlist[currentIndex];
  audio.play();

  audio.onended = () => {
    currentIndex++;
    playNext();
  };
}




