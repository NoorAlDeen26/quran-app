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

 const playBtn = document.getElementById("playBtn");
const reciterSelect = document.getElementById("reciterSelect");

playBtn.addEventListener("click", async () => {
  const surahNumber = surahSelect.value || 1;
  const reciter = reciterSelect.value;

  try {
    const response = await fetch(
      `https://api.alquran.cloud/v1/surah/${surahNumber}/${reciter}`
    );
    const data = await response.json();

    // Concatenate all ayah audio into one stream (browser plays sequentially)
    const audioUrls = data.data.ayahs.map(a => a.audio);

    let index = 0;
    audio.src = audioUrls[index];
    audio.play();

    audio.onended = () => {
      index++;
      if (index < audioUrls.length) {
        audio.src = audioUrls[index];
        audio.play();
      }
    };

  } catch (err) {
    alert("Audio failed to load.");
    console.error(err);
  }
});

