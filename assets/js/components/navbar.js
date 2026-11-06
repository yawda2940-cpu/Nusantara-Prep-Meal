import { IMAGES } from '../data/images.js';
import { getLang, setLang } from '../i18n/i18n.js';
import { el, tr } from '../utils/dom.js';

const LINKS = [
  { page: 'home', href: 'index.html', key: 'nav.home' },
  { page: 'about', href: 'about.html', key: 'nav.about' },
  { page: 'menu', href: 'menu.html', key: 'nav.menu' },
  { page: 'promo', href: 'promo.html', key: 'nav.promo' },
  { page: 'contact', href: 'contact.html', key: 'nav.contact' },
];

/** Menyuntikkan navbar kapsul melayang ke #site-header. */
export function renderNavbar(container) {
  if (!container) return;
  const activePage = document.body.dataset.page;

  const links = el('ul', { class: 'navbar__links', id: 'navbar-links' },
    LINKS.map((l) =>
      el('li', {}, tr(l.key, 'a', {
        class: `navbar__link${l.page === activePage ? ' is-active' : ''}`,
        href: l.href,
        ...(l.page === activePage ? { 'aria-current': 'page' } : {}),
      }))
    )
  );

  const langButtons = ['id', 'en'].map((lang) =>
    el('button', { class: 'lang-btn', type: 'button', dataset: { lang }, text: lang.toUpperCase(), onclick: () => setLang(lang) })
  );
  const syncLang = () => langButtons.forEach((b) => b.classList.toggle('is-active', b.dataset.lang === getLang()));

  const toggle = el('button', {
    class: 'navbar__toggle',
    type: 'button',
    'aria-expanded': 'false',
    'aria-controls': 'navbar-links',
    'data-i18n-aria': 'nav.toggle',
    onclick: () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    },
  }, el('span', { class: 'material-symbols-outlined', 'aria-hidden': 'true', text: 'menu' }));

  const nav = el('nav', { class: 'navbar__capsule', 'data-i18n-aria': 'nav.main' },
    el('a', { class: 'navbar__logo', href: 'index.html' }, el('img', { src: IMAGES.logo, alt: 'Nusantara Meal Prep' })),
    links,
    el('div', { class: 'navbar__actions' },
      el('div', { class: 'lang-switcher' }, langButtons),
      tr('nav.order', 'a', { class: 'btn btn--primary navbar__cta', href: 'contact.html#kirim-pesan' }),
      toggle
    )
  );

  container.className = 'navbar';
  container.replaceChildren(nav);
  syncLang();
  document.addEventListener('languagechange', syncLang);
}
