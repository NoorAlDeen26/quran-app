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

playBtn.addEventListener("click", async () => {
  const surahNumber = surahSelect.value || 1;

  try {
    const response = await fetch(
      `https://api.alquran.cloud/v1/surah/${surahNumber}/ar.abdulbasitmurattal`
    );
    const data = await response.json();

    // Use first ayah audio as stream source
    audio.src = data.data.ayahs[0].audio;
    audio.load();
    audio.play();
  } catch (err) {
    alert("Audio failed to load. Please try again.");
    console.error(err);
  }
});
