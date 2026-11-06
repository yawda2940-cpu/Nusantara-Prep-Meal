import { SITE } from '../config/site.js';
import id from './locales/id.js';
import en from './locales/en.js';

const LOCALES = { id, en };
let current = SITE.defaultLang;

export const getLang = () => current;

/** Ambil teks; jika belum diterjemahkan, jatuh ke Bahasa Indonesia. */
export const t = (key) => LOCALES[current][key] ?? LOCALES.id[key] ?? key;

export function loadLang() {
  try {
    const saved = localStorage.getItem(SITE.langStorageKey);
    if (saved && LOCALES[saved]) current = saved;
  } catch { /* localStorage bisa diblokir */ }
  document.documentElement.lang = current;
}

export function setLang(lang) {
  if (!LOCALES[lang] || lang === current) return;
  current = lang;
  try { localStorage.setItem(SITE.langStorageKey, lang); } catch { /* abaikan */ }
  document.documentElement.lang = lang;
  document.dispatchEvent(new CustomEvent('languagechange', { detail: { lang } }));
}

/** Terapkan terjemahan ke seluruh atribut data-i18n*. */
export function applyTranslations(root = document) {
  root.querySelectorAll('[data-i18n]').forEach((n) => { n.textContent = t(n.dataset.i18n); });
  root.querySelectorAll('[data-i18n-html]').forEach((n) => { n.innerHTML = t(n.dataset.i18nHtml); });
  root.querySelectorAll('[data-i18n-placeholder]').forEach((n) => { n.placeholder = t(n.dataset.i18nPlaceholder); });
  root.querySelectorAll('[data-i18n-aria]').forEach((n) => { n.setAttribute('aria-label', t(n.dataset.i18nAria)); });
}
