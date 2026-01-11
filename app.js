const surahSelect = document.getElementById("surahSelect");
document.getElementById("leftPage").innerHTML += ayahHtml;
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
  let quranHtml = "";

  fetch(`https://api.quran.com/api/v4/verses/by_chapter/${id}?fields=text_uthmani`)
    .then(res => res.json())
    .then(data => {
      data.verses.forEach(v => {
        quranHtml += `<div class="ayah">${v.text_uthmani}</div>`;
      });

      document.getElementById("leftPage").innerHTML = quranHtml;
    });
}


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
