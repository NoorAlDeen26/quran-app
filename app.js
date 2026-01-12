const surahSelect = document.getElementById("surahSelect");
const reciterSelect = document.getElementById("reciterSelect");
const playBtn = document.getElementById("playBtn");
const audio = document.getElementById("audio");
const quranText = document.getElementById("quranText");

/* Load Surah list */
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

/* Load Quran text */
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
}

surahSelect.addEventListener("change", () => {
  loadSurah(surahSelect.value);
});

/* Play Audio */
playBtn.addEventListener("click", () => {
  const surahId = surahSelect.value;
  const reciter = reciterSelect.value;

  const padded = surahId.toString().padStart(3, "0");

  audio.src = `https://cdn.islamic.network/quran/audio-surah/128/${reciter}/${padded}.mp3`;
  audio.play();
});
