/**
 * Titik masuk bersama. Setiap halaman memanggil bootstrap(renderHalaman).
 * Urutan: muat bahasa -> suntik navbar/footer/chatbot -> render halaman -> terjemahkan -> animasi.
 */
import { initCarousels } from './components/carousel.js';
import { initChatbot } from './components/chatbot.js';
import { renderFooter } from './components/footer.js';
import { renderNavbar } from './components/navbar.js';
import { IMAGES } from './data/images.js';
import { applyTranslations, loadLang } from './i18n/i18n.js';
import { initParallax } from './utils/parallax.js';
import { initReveal } from './utils/reveal.js';

/** Mengisi src gambar statis dari data/images.js: <img data-img="nasiKuning">. */
function applyImages() {
  document.querySelectorAll('img[data-img]').forEach((img) => {
    const src = IMAGES[img.dataset.img];
    if (src) img.src = src;
  });
}

export function bootstrap(renderPage = () => {}) {
  loadLang();
  applyImages();

  renderNavbar(document.getElementById('site-header'));
  renderFooter(document.getElementById('site-footer'));
  initChatbot(document.getElementById('site-chatbot'));

  const refresh = () => {
    renderPage(); // konten dari data/*.js (dirender ulang saat bahasa berganti)
    applyTranslations();
    initReveal();
  };

  refresh();
  document.addEventListener('languagechange', refresh);
  initCarousels();
  initParallax();
}
