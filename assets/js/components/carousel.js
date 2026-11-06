/**
 * Carousel horizontal berbasis scroll-snap.
 * Tombol memakai atribut: data-carousel-target="<id track>" data-carousel-dir="-1|1".
 * Memakai event delegation, jadi tetap bekerja walau kartu dirender ulang.
 */
const STEP = 304; // lebar kartu 280px + jarak 24px

export function initCarousels() {
  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-carousel-target]');
    if (!button) return;
    const track = document.getElementById(button.dataset.carouselTarget);
    if (!track) return;
    track.scrollBy({ left: Number(button.dataset.carouselDir) * STEP, behavior: 'smooth' });
  });
}
