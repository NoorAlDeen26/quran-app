const surahSelect = document.getElementById("surahSelect");
const reciterSelect = document.getElementById("reciterSelect");
const quranText = document.getElementById("quranText");
const audioPlayer = document.getElementById("audioPlayer");

// Load surah list (1–114)
for (let i = 1; i <= 114; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = `Surah ${i}`;
  surahSelect.appendChild(option);
}

// Load selected surah
async function loadSurah(surahNumber) {
  quranText.innerHTML = "Loading...";

  try {
    const response = await fetch(
      `https://api.alquran.cloud/v1/surah/${surahNumber}/quran-uthmani`
    );

    const data = await response.json();
    const ayahs = data.data.ayahs;

    quranText.innerHTML = "";

    ayahs.forEach((ayah) => {
      const span = document.createElement("span");
      span.className = "ayah";
      span.innerHTML = `${ayah.text} <span class="ayah-number">${ayah.numberInSurah}</span> `;
      quranText.appendChild(span);
    });

    updateAudio(surahNumber);
  } catch (error) {
    quranText.innerHTML = "Failed to load surah.";
    console.error(error);
  }
}

// Format surah number to 3 digits (001, 002, etc.)
function formatSurahNumber(num) {
  return num.toString().padStart(3, "0");
}

// Update audio source
function updateAudio(surahNumber) {
  const reciter = reciterSelect.value;
  const formatted = formatSurahNumber(surahNumber);

  const reciters = {
    AbdulBaset: `https://server8.mp3quran.net/abdul_basit_murattal/${formatted}.mp3`,
    Alafasy: `https://server8.mp3quran.net/afs/${formatted}.mp3`
  };

  audioPlayer.src = reciters[reciter];
}

// Event listeners
surahSelect.addEventListener("change", () => {
  loadSurah(surahSelect.value);
});

reciterSelect.addEventListener("change", () => {
  updateAudio(surahSelect.value);
});

// Load first surah on start
loadSurah(1);
