/** Parallax halus untuk elemen [data-parallax="0.1"] (nilai = kecepatan). Mati bila reduced-motion. */
export function initParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const items = [...document.querySelectorAll('[data-parallax]')];
  if (!items.length) return;
  let ticking = false;
  const update = () => {
    const y = window.scrollY;
    items.forEach((item) => {
      item.style.transform = `translateY(${y * parseFloat(item.dataset.parallax)}px)`;
    });
    ticking = false;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
}
