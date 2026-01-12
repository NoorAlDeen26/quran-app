const surahSelect = document.getElementById("surahSelect");
const reciterSelect = document.getElementById("reciterSelect");
const playBtn = document.getElementById("playBtn");
const audio = document.getElementById("audio");
const quranText = document.getElementById("quranText");

let verses = [];
let currentAyah = 0;

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
  verses = [];
  currentAyah = 0;

  fetch(`https://api.quran.com/api/v4/verses/by_chapter/${id}?fields=text_uthmani`)
    .then(res => res.json())
    .then(data => {
      verses = data.verses;

      verses.forEach(v => {
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

/* Play ayah-by-ayah (FULL SURAH) */
playBtn.addEventListener("click", () => {
  currentAyah = 0;
  playNextAyah();
});

audio.addEventListener("ended", playNextAyah);

function playNextAyah() {
  if (currentAyah >= verses.length) return;

  const surah = surahSelect.value.toString().padStart(3, "0");
  const ayah = (currentAyah + 1).toString().padStart(3, "0");
  const reciter = reciterSelect.value;

  audio.src = `https://everyayah.com/data/${reciter}/${surah}${ayah}.mp3`;
  audio.load();
  audio.play();

  currentAyah++;
}

const cover = document.getElementById("coverScreen")
const mushaf = document.getElementById("mushafScreen");

cover.addEventListener("click", () => {
  cover.classList.add("hidden");
  mushaf.classList.remove("hidden");
});
