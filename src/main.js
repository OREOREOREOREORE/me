// ── Book review system ──
const booksGrid = document.querySelector('.books');
const detailView = document.querySelector('.book-detail');

if (booksGrid && detailView) {
  initBooks();
}

async function initBooks() {
  const res = await fetch('./site/books.json');
  const books = await res.json();

  // Render grid
  booksGrid.innerHTML = '';
  books.forEach(book => {
    const stars = '★'.repeat(book.rating) + '☆'.repeat(5 - book.rating);
    const el = document.createElement('div');
    el.classList.add('book');
    el.dataset.id = book.id;
    el.innerHTML = `
      <img src="${encodeURI(book.image)}" alt="${book.title}" class="book-img">
      <div class="book-data">
        <h3 class="book-title">${book.title}</h3>
        <p class="book-rating">Stars: ${stars}</p>
      </div>
    `;
    el.addEventListener('click', () => showDetail(book));
    booksGrid.appendChild(el);
  });
}

function showDetail(book) {
  const stars = '★'.repeat(book.rating) + '☆'.repeat(5 - book.rating);
  detailView.innerHTML = `
    <p class="detail-title">${book.title} <span class="detail-author">by ${book.author}</span></p>
    <div class="detail-meta">
      <span class="detail-date">${book.date}</span>
      <span class="detail-time">${book.readingTime} read</span>
    </div>
    <p class="detail-review">${book.review}</p>
  `;
  detailView.classList.add('open');
  document.querySelector('.books-container').classList.add('hidden');
  detailView.querySelector('.detail-close').addEventListener('click', hideDetail);
}
// <p class="detail-rating">${stars}</p>
// <span class="detail-tag">${book.tag}</span>
// <button class="detail-close" aria-label="Close">&larr; Back</button>

function hideDetail() {
  detailView.classList.remove('open');
  document.querySelector('.books-container').classList.remove('hidden');
}

// -- Think system --
const thinkCards = document.querySelector('.cards');
const thinkDetail = document.querySelector('.cards-detail');

if (thinkCards && thinkDetail) {initThink();}

async function initThink() {
  const res = await fetch('./site/think.json');
  const thinks = await res.json()

  thinkCards.innerHTML = '';
  thinks.forEach(think => {
    const el = document.createElement('article');
    el.classList.add('card');
    el.dataset.id = think.id;
    el.innerHTML = `
       <div class="card-data">
						<h2 class="card-title">${think.title}</h2>
						<p class="card-description">${think.info}</p>
				</div>
    `;
    el.addEventListener('click', () => showThinkDetail(think));
    thinkCards.appendChild(el);
  })
}
{/* <a href="#" target="_blank" rel="noopener noreferrer" class="card-button">Read more</a> */}

function showThinkDetail(think){
  const contentUrl = `./site/${think.file}`;
  fetch(contentUrl)
    .then(res => res.ok ? res.text() : '')
    .then(html => {
      thinkDetail.innerHTML = `
        <p class="card-detail-title">${think.title}</p>
        <blockquote>${think.info}</blockquote>
        <div class="card-detail-think">${html}</div>
      `;
      thinkDetail.classList.add('open');
      document.querySelector('.cards-container').classList.add('hidden-cards');
      document.querySelector('.wrapper.block').classList.add('hidden-cards');
    });
}
