const leftPage = document.getElementById("leftPage");
const rightPage = document.getElementById("rightPage");

async function loadSurah(surah = 1) {
  const res = await fetch(
    `https://api.quran.com/api/v4/verses/by_chapter/${surah}?language=ar&words=false&text_type=uthmani`
  );

  const data = await res.json();
  renderPages(data.verses);
}

function renderPages(verses) {
  leftPage.innerHTML = "";
  rightPage.innerHTML = "";

  let pages = [leftPage, rightPage];
  let currentPageIndex = 1; // start right page (Mushaf style)
  let currentPage = pages[currentPageIndex];

  verses.forEach(v => {
    const span = document.createElement("span");
    span.className = "ayah";
    span.innerHTML = `
      ${v.text_uthmani}
      <span class="ayah-number">۝ ${v.verse_number} ۝</span>
    `;

    currentPage.appendChild(span);

    // If page overflows → move to other page
    if (currentPage.scrollHeight > currentPage.clientHeight) {
      currentPage.removeChild(span);
      currentPageIndex = currentPageIndex === 0 ? 1 : 0;
      currentPage = pages[currentPageIndex];
      currentPage.appendChild(span);
    }
  });
}

// Load Surah Al-Fatihah by default
loadSurah(1);
