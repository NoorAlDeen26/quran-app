const surahSelect = document.getElementById("surahSelect");
const reciterSelect = document.getElementById("reciterSelect");
const playBtn = document.getElementById("playBtn");
const audio = document.getElementById("audio");
const leftPage = document.getElementById("leftPage");
const rightPage = document.getElementById("rightPage");

let verses = [];
let currentAyah = 0;

/* Load Surah List */
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

surahSelect.addEventListener("change", () => {
  loadSurah(surahSelect.value);
});

/* Load Qur’an Text */
function loadSurah(id) {
  fetch(`https://api.quran.com/api/v4/verses/by_chapter/${id}?fields=text_uthmani`)
    .then(res => res.json())
    .then(data => {
      verses = data.verses;
      renderPages();
    });
}

/* Render Mushaf Pages */
function renderPages() {
  leftPage.innerHTML = "";
  rightPage.innerHTML = "";

  let halfway = Math.ceil(verses.length / 2);

  verses.forEach((v, index) => {
    const span = document.createElement("span");
    span.innerHTML = `${v.text_uthmani} <span class="ayah-number">﴿${v.verse_number}﴾</span> `;

    if (index < halfway) {
      rightPage.appendChild(span);
    } else {
      leftPage.appendChild(span);
    }
  });
}

/* Audio Playback */
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
  audio.play();

  currentAyah++;
}
