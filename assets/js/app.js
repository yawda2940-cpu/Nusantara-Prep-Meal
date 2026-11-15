/**
 * Titik masuk bersama. Setiap halaman memanggil bootstrap(renderHalaman).
 * Urutan: muat bahasa -> suntik navbar/footer/chatbot -> render halaman -> terjemahkan -> animasi.
 */
import { initCarousels } from './components/carousel.js';
import { initChatbot } from './components/chatbot.js';
import { renderFooter } from './components/footer.js';
import { renderNavbar } from './components/navbar.js';
import { FALLBACK_IMAGE, IMAGES } from './data/images.js';
import { applyTranslations, loadLang } from './i18n/i18n.js';
import { initParallax } from './utils/parallax.js';
import { initReveal } from './utils/reveal.js';

/** Jika gambar gagal dimuat, ganti dengan gambar cadangan agar tidak muncul ikon rusak. */
function installImageFallback() {
  document.addEventListener(
    'error',
    (e) => {
      const img = e.target;
      if (img instanceof HTMLImageElement && img.src !== FALLBACK_IMAGE && !img.dataset.fallback) {
        img.dataset.fallback = '1';
        img.src = FALLBACK_IMAGE;
      }
    },
    true
  );
}

/** Mengisi src gambar statis dari data/images.js: <img data-img="nasiKuning">. */
function applyImages() {
  document.querySelectorAll('img[data-img]').forEach((img) => {
    const src = IMAGES[img.dataset.img];
    if (src) img.src = src;
  });
}

export function bootstrap(renderPage = () => {}) {
  loadLang();
  installImageFallback();
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
