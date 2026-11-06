/** Memunculkan elemen [data-reveal] saat masuk layar. */
let observer;

export function initReveal(root = document) {
  const targets = root.querySelectorAll('[data-reveal]:not(.is-visible)');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach((t) => t.classList.add('is-visible'));
    return;
  }
  observer ??= new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }),
    { threshold: 0.12 }
  );
  targets.forEach((t) => observer.observe(t));
}
