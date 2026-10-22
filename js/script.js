// Combined Data Store & SPA Navigation Logic
const APP_DATA = {
  series: [
    {
      id: "original",
      title: "Tim and Tom",
      description: "The original Year 6 series created as a comedy project. Represents the initial debut of the characters.",
      badge: "Original Series",
      coverClass: "cover-orig"
    },
    {
      id: "rebirth",
      title: "Tim and Tom: Rebirth Edition",
      description: "A recreated version of the series. Books 1–5 are preserved in full. Remaining books are lost media.",
      badge: "Rebirth Edition",
      coverClass: "cover-rebirth"
    },
    {
      id: "english",
      title: "Tim and Tom: English Language Edition",
      description: "A separate edition developed through English Language classes, evolving from comedy into a structured storyline.",
      badge: "English Language Edition",
      coverClass: "cover-english"
    }
  ],

  books: [
    {
      id: "orig-1",
      seriesId: "original",
      number: 1,
      title: "Tim and Tom",
      available: true,
      summary: "The inaugural comedy story introducing Tim and Tom.",
      content: "<p>This is the original manuscript for Book 1: Tim and Tom.</p><p>Tim looked at Tom. Tom looked at Tim. It was the beginning of an extraordinary adventure that started in Year 6.</p>"
    },
    {
      id: "orig-2",
      seriesId: "original",
      number: 2,
      title: "Lifesum",
      available: true,
      summary: "The second instalment following their quirky misadventures.",
      content: "<p>This is the original manuscript for Book 2: Lifesum.</p><p>Tracking life choices and comedy situations, Tim and Tom navigate another bizarre scenario.</p>"
    },
    {
      id: "orig-3",
      seriesId: "original",
      number: 3,
      title: "Fortnite Account",
      available: true,
      summary: "The third story in the original comedy trilogy.",
      content: "<p>This is the original manuscript for Book 3: Fortnite Account.</p><p>Digital chaos ensues as the duo attempts to manage their virtual assets.</p>"
    },
    { id: "rebirth-1", seriesId: "rebirth", number: 1, title: "Rebirth: Chapter 1", available: true, content: "<p>Preserved text for Rebirth Book 1.</p>" },
    { id: "rebirth-2", seriesId: "rebirth", number: 2, title: "Rebirth: Chapter 2", available: true, content: "<p>Preserved text for Rebirth Book 2.</p>" },
    { id: "rebirth-3", seriesId: "rebirth", number: 3, title: "Rebirth: Chapter 3", available: true, content: "<p>Preserved text for Rebirth Book 3.</p>" },
    { id: "rebirth-4", seriesId: "rebirth", number: 4, title: "Rebirth: Chapter 4", available: true, content: "<p>Preserved text for Rebirth Book 4.</p>" },
    { id: "rebirth-5", seriesId: "rebirth", number: 5, title: "Rebirth: Chapter 5", available: true, content: "<p>Preserved text for Rebirth Book 5.</p>" },
    { id: "rebirth-6", seriesId: "rebirth", number: 6, title: "Lost Volume 6", available: false, isLostMedia: true },
    { id: "rebirth-7", seriesId: "rebirth", number: 7, title: "Lost Volume 7", available: false, isLostMedia: true },
    { id: "eng-1", seriesId: "english", number: 1, title: "Classroom Chronicles", available: true, content: "<p>Text from English Language Edition Book 1.</p><p>As the curriculum shifted, so did the story arc, taking on higher narrative stakes.</p>" }
  ],

  quotes: [
    {
      id: "q1",
      text: "Tim looked at Tom. Tom looked at Tim.",
      character: "Narrator",
      seriesId: "original",
      bookNumber: 1
    }
  ],

  timeline: [
    { date: "Year 6 Debut", title: "Original Project Inception", description: "The initial comedy project started as a Year 6 creation featuring Tim and Tom." },
    { date: "Rebirth Era", title: "Rebirth Reconstruction", description: "Attempts were made to recreate the series; Books 1–5 survived while later volumes became lost media." },
    { date: "English Class Era", title: "English Language Edition", description: "The story evolved in English language classes, expanding into broader storylines." }
  ],

  characters: [
    { name: "Tim", icon: "👦", desc: "Core protagonist featured throughout the series evolution." },
    { name: "Tom", icon: "👦", desc: "Core protagonist and partner in comedic misadventures." },
    { name: "Elle", icon: "👧", desc: "Key character appearing in expanded storyline arcs." },
    { name: "Herobrine", icon: "👾", desc: "Antagonistic/mysterious presence integrated into early stories." },
    { name: "Thomas Clancy", icon: "🕵️", desc: "Featured figure in later narrative developments." }
  ],

  secrets: {
    enabled: true,
    message: "🎉 You found Archive Record #001: The original Year 6 notebook was written with a blue ballpoint pen!"
  }
};

// Global App State
let activeSeriesId = null;
let activeBookId = null;

// Routing Navigation Function
function navigateTo(pageId, extraParam = null) {
  // Hide all SPA pages
  document.querySelectorAll(".spa-page").forEach(p => p.classList.remove("active"));
  
  // Highlight navigation bar links
  document.querySelectorAll(".main-nav a").forEach(link => {
    if (link.dataset.page === pageId) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  const targetPage = document.getElementById(`page-${pageId}`);
  if (targetPage) targetPage.classList.add("active");

  window.scrollTo(0, 0);

  // Render specific views based on navigation
  if (pageId === 'home') renderHomepage();
  if (pageId === 'series') renderSeriesPage(extraParam);
  if (pageId === 'reader') renderReaderPage(extraParam);
  if (pageId === 'quotes') renderQuotesPage();
  if (pageId === 'rated') renderRatedPage();
  if (pageId === 'timeline') renderTimelinePage();
  if (pageId === 'characters') renderCharactersPage();
  if (pageId === 'secrets') renderSecretsPage();
}

// 1. Render Homepage
function renderHomepage() {
  const grid = document.getElementById("series-grid");
  if (!grid) return;

  grid.innerHTML = APP_DATA.series.map(s => `
    <div class="series-card" onclick="navigateTo('series', '${s.id}')">
      <div class="series-cover-placeholder ${s.coverClass}">
        <div class="series-cover-title">${s.title}</div>
      </div>
      <h3>${s.title}</h3>
      <p>${s.description}</p>
      <div class="series-meta-tag">${s.badge} &rarr;</div>
    </div>
  `).join("");
}

// 2. Render Series Detail
function renderSeriesPage(seriesId) {
  if (seriesId) activeSeriesId = seriesId;
  else if (!activeSeriesId) activeSeriesId = "original";

  const series = APP_DATA.series.find(s => s.id === activeSeriesId);
  const books = APP_DATA.books.filter(b => b.seriesId === activeSeriesId);

  const headerElem = document.getElementById("series-header");
  const gridElem = document.getElementById("books-grid");

  if (headerElem && series) {
    headerElem.innerHTML = `
      <h2 style="font-family: var(--font-heading); font-size: 2rem;">${series.title}</h2>
      <p class="section-desc" style="margin: 10px 0 20px 0;">${series.description}</p>
      <p><strong>Total Catalogued Volumes:</strong> ${books.length}</p>
    `;
  }

  if (gridElem) {
    gridElem.innerHTML = books.map(b => {
      if (!b.available || b.isLostMedia) {
        return `
          <div class="book-card disabled">
            <div class="book-card-number">Book ${b.number}</div>
            <div class="book-card-title">${b.title}</div>
            <span class="lost-media-badge">Lost Media</span>
          </div>
        `;
      }
      return `
        <div class="book-card" onclick="navigateTo('reader', '${b.id}')">
          <div class="book-card-number">Book ${b.number}</div>
          <div class="book-card-title">${b.title}</div>
          <span class="available-badge">Read Online</span>
        </div>
      `;
    }).join("");
  }
}

// 3. Render Reader Page
function renderReaderPage(bookId) {
  if (bookId) activeBookId = bookId;
  const book = APP_DATA.books.find(b => b.id === activeBookId);

  if (!book || !book.available) return;

  const series = APP_DATA.series.find(s => s.id === book.seriesId);
  const seriesBooks = APP_DATA.books.filter(b => b.seriesId === book.seriesId && b.available);
  const currentIndex = seriesBooks.findIndex(b => b.id === book.id);

  const prevBook = seriesBooks[currentIndex - 1];
  const nextBook = seriesBooks[currentIndex + 1];

  document.getElementById("reader-series-name").textContent = series ? series.title : "Series Archive";
  document.getElementById("reader-book-title").textContent = `Book ${book.number}: ${book.title}`;
  document.getElementById("reader-content-body").innerHTML = book.content || "<p>Manuscript text placeholder.</p>";

  // Bottom Navigation Buttons
  const prevBtn = document.getElementById("prev-book-btn");
  const nextBtn = document.getElementById("next-book-btn");
  const backSeriesBtn = document.getElementById("back-series-btn");

  backSeriesBtn.onclick = () => navigateTo('series', book.seriesId);

  if (prevBook) {
    prevBtn.classList.remove("btn-disabled");
    prevBtn.onclick = () => navigateTo('reader', prevBook.id);
    prevBtn.innerHTML = `&larr; Book ${prevBook.number}: ${prevBook.title}`;
  } else {
    prevBtn.classList.add("btn-disabled");
    prevBtn.onclick = null;
  }

  if (nextBook) {
    nextBtn.classList.remove("btn-disabled");
    nextBtn.onclick = () => navigateTo('reader', nextBook.id);
    nextBtn.innerHTML = `Book ${nextBook.number}: ${nextBook.title} &rarr;`;
  } else {
    nextBtn.classList.add("btn-disabled");
    nextBtn.onclick = null;
  }

  setupRatingSystem(book.id);
}

// Rating System Logic
function setupRatingSystem(bookId) {
  const stars = document.querySelectorAll("#star-rating-control .star");
  const statsDisplay = document.getElementById("rating-stats-display");
  const savedRating = localStorage.getItem(`rating_${bookId}`);

  function updateStars(val) {
    stars.forEach(s => {
      if (parseInt(s.dataset.value) <= val) s.classList.add("active");
      else s.classList.remove("active");
    });
  }

  if (savedRating) {
    updateStars(parseInt(savedRating));
    if (statsDisplay) statsDisplay.textContent = `(Your local rating: ${savedRating}/5)`;
  } else if (statsDisplay) {
    statsDisplay.textContent = "(Unrated locally)";
  }

  stars.forEach(s => {
    s.onclick = () => {
      const val = parseInt(s.dataset.value);
      localStorage.setItem(`rating_${bookId}`, val);
      updateStars(val);
      if (statsDisplay) statsDisplay.textContent = `(Your local rating: ${val}/5)`;
    };
  });
}

// 4. Quotes Page
function renderQuotesPage() {
  const grid = document.getElementById("quotes-grid");
  const searchInput = document.getElementById("quote-search");
  const filterSelect = document.getElementById("quote-filter-series");

  if (filterSelect && filterSelect.options.length <= 1) {
    APP_DATA.series.forEach(s => {
      const opt = document.createElement("option");
      opt.value = s.id;
      opt.textContent = s.title;
      filterSelect.appendChild(opt);
    });
  }

  function filterQuotes() {
    const query = searchInput ? searchInput.value.toLowerCase() : "";
    const selectedSeries = filterSelect ? filterSelect.value : "all";

    const filtered = APP_DATA.quotes.filter(q => {
      const matchesSearch = q.text.toLowerCase().includes(query) || q.character.toLowerCase().includes(query);
      const matchesSeries = selectedSeries === "all" || q.seriesId === selectedSeries;
      return matchesSearch && matchesSeries;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `<div class="empty-state"><p>The quote archive is currently waiting for additional manuscript quotes to be indexed.</p></div>`;
      return;
    }

    grid.innerHTML = filtered.map(q => {
      const series = APP_DATA.series.find(s => s.id === q.seriesId);
      return `
        <div class="quote-card">
          <p class="quote-text">"${q.text}"</p>
          <p class="quote-author">&mdash; ${q.character}</p>
          <p class="quote-source">${series ? series.title : "Archive"} (Book ${q.bookNumber})</p>
        </div>
      `;
    }).join("");
  }

  if (searchInput) searchInput.oninput = filterQuotes;
  if (filterSelect) filterSelect.onchange = filterQuotes;

  filterQuotes();
}

// 5. Highest Rated Page
function renderRatedPage() {
  const container = document.getElementById("rated-list");
  if (!container) return;

  const ratedBooks = APP_DATA.books.filter(b => b.available).map(b => {
    const localRating = localStorage.getItem(`rating_${b.id}`);
    return {
      ...b,
      userRating: localRating ? parseInt(localRating) : 0
    };
  }).sort((a, b) => b.userRating - a.userRating);

  container.innerHTML = ratedBooks.map(b => {
    const series = APP_DATA.series.find(s => s.id === b.seriesId);
    const ratingStars = b.userRating > 0 ? "★".repeat(b.userRating) + "☆".repeat(5 - b.userRating) : "Unrated";
    return `
      <div class="rated-item">
        <div>
          <h4 style="font-family: var(--font-heading); font-size: 1.1rem;">Book ${b.number}: ${b.title}</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted);">${series ? series.title : ""}</p>
        </div>
        <div style="text-align: right;">
          <div style="color: var(--gold-accent); font-size: 1.1rem;">${ratingStars}</div>
          <button onclick="navigateTo('reader', '${b.id}')" class="btn btn-secondary" style="margin-top: 5px; font-size: 0.8rem; padding: 4px 10px;">Read</button>
        </div>
      </div>
    `;
  }).join("");
}

// 6. Timeline Page
function renderTimelinePage() {
  const container = document.getElementById("timeline-container");
  if (!container) return;

  container.innerHTML = APP_DATA.timeline.map(item => `
    <div class="timeline-entry">
      <div class="timeline-date">${item.date}</div>
      <h3 style="font-family: var(--font-heading); margin: 5px 0;">${item.title}</h3>
      <p style="color: var(--text-muted); font-size: 0.95rem;">${item.description}</p>
    </div>
  `).join("");
}

// 7. Characters Page
function renderCharactersPage() {
  const container = document.getElementById("characters-grid");
  if (!container) return;

  container.innerHTML = APP_DATA.characters.map(c => `
    <div class="character-card">
      <div class="character-avatar">${c.icon}</div>
      <h3 style="font-family: var(--font-heading); font-size: 1.2rem; margin-bottom: 8px;">${c.name}</h3>
      <p style="font-size: 0.9rem; color: var(--text-muted);">${c.desc}</p>
    </div>
  `).join("");
}

// 8. Secrets Page
function renderSecretsPage() {
  const toggleBtn = document.getElementById("secret-toggle-btn");
  const displayBox = document.getElementById("secret-content-display");

  if (toggleBtn && displayBox) {
    toggleBtn.onclick = () => {
      if (APP_DATA.secrets.enabled) {
        displayBox.textContent = APP_DATA.secrets.message;
        displayBox.classList.remove("hidden");
      } else {
        displayBox.textContent = "Secrets are currently disabled in data config.";
        displayBox.classList.remove("hidden");
      }
    };
  }
}

// App Initialization
document.addEventListener("DOMContentLoaded", () => {
  // Bind Header Navigation
  document.querySelectorAll(".main-nav a").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const pageId = link.dataset.page;
      navigateTo(pageId);
    });
  });

  // Reading progress scroll handler
  window.addEventListener("scroll", () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById("reading-progress");
    if (progressBar) progressBar.style.width = scrolled + "%";
  });

  // Default initial page
  navigateTo('home');
});
