const reciterSelect = document.getElementById("reciterSelect");
const surahSelect = document.getElementById("surahSelect");
const quranText = document.getElementById("quranText");
const audio = document.getElementById("audio");
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
<audio id="audio" controls>
  <source src="https://cdn.islamic.network/quran/audio/128/ar.abdulbasitmurattal/1.mp3" type="audio/mpeg">
</audio>

}
