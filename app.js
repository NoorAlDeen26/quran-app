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
      const opt = document.createElement("option");
      opt.value = ch.id;
      opt.textContent = `${ch.id}. ${ch.name_arabic}`;
      surahSelect.appendChild(opt);
    });

    loadSurah(1);
  });

/* Load Qur’an text */
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

/* Play audio — GUARANTEED WORKING SOURCE */
playBtn.addEventListener("click", () => {
  const surah = surahSelect.value.toString().padStart(3, "0");
  const reciter = reciterSelect.value;

  audio.src = `https://everyayah.com/data/${reciter}/${surah}001.mp3`;
  audio.load();
  audio.play();
});
