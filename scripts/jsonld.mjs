/**
 * Pembangun JSON-LD (schema.org) untuk pra-render.
 * Semua nilai diambil dari sumber data situs (config, data, locales) agar konsisten dengan teks halaman.
 * Aturan: tidak ada Review/AggregateRating, dan properti yang datanya belum ada
 * (jam buka, koordinat, kode pos, nomor rumah) sengaja DILEWATI, bukan dikarang.
 */
import { SITE, instagramUrl } from '../assets/js/config/site.js';
import { FAQ_ITEMS, HOME_FAQ_ITEMS, faqAnswer } from '../assets/js/data/faq.js';
import { IMAGES } from '../assets/js/data/images.js';
import { MENU_CATEGORIES, SIGNATURE_MENU } from '../assets/js/data/menu.js';
import { PLANS } from '../assets/js/data/plans.js';
import { t } from '../assets/js/i18n/i18n.js';
import { parseRupiah } from '../assets/js/utils/format.js';

export const BASE = 'https://nusantara-prep-meal.vercel.app';
const ORG_ID = `${BASE}/#organization`;
const SITE_ID = `${BASE}/#website`;
const LANG = 'id-ID';

const idr = (n) => `Rp${n.toLocaleString('id-ID')}`;
const abs = (path) => (path.startsWith('http') ? path : `${BASE}${path}`);

/** Entitas bisnis. Alamat: jalan dari SITE.mapQuery, kota Madiun, Jawa Timur. */
function organization() {
  const prices = SIGNATURE_MENU.map((m) => parseRupiah(m.price));
  const street = SITE.mapQuery.split(',')[0].trim();
  return {
    '@type': 'FoodEstablishment',
    '@id': ORG_ID,
    name: SITE.name,
    url: `${BASE}/`,
    description: 'Layanan meal prep dan katering sehat langganan dengan masakan khas Indonesia di Kota Madiun, Jawa Timur.',
    logo: abs(IMAGES.logo),
    image: abs('/assets/images/og-cover.png'),
    telephone: `+${SITE.whatsapp}`,
    email: SITE.email,
    sameAs: [instagramUrl()],
    servesCuisine: 'Indonesian',
    priceRange: `${idr(Math.min(...prices))} - ${idr(Math.max(...prices))}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: street,
      addressLocality: 'Madiun',
      addressRegion: 'Jawa Timur',
      addressCountry: 'ID',
    },
    areaServed: { '@type': 'City', name: 'Madiun' },
    hasMap: `https://www.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}`,
    hasMenu: `${BASE}/menu`,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: `+${SITE.whatsapp}`,
      email: SITE.email,
      availableLanguage: 'id',
    },
  };
}

const website = () => ({
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: `${BASE}/`,
  name: SITE.name,
  inLanguage: LANG,
  publisher: { '@id': ORG_ID },
});

/** Info tiap halaman: path, nama untuk breadcrumb, dan tipe WebPage. */
export const PAGE_META = {
  home: { path: '/', name: () => t('nav.home'), type: 'WebPage' },
  about: { path: '/about', name: () => t('nav.about'), type: 'AboutPage' },
  menu: { path: '/menu', name: () => t('nav.menu'), type: 'WebPage' },
  promo: { path: '/promo', name: () => t('nav.promo'), type: 'WebPage' },
  contact: { path: '/contact', name: () => t('nav.contact'), type: 'ContactPage' },
  privasi: { path: '/privasi', name: () => t('footer.privacy'), type: 'WebPage' },
  syarat: { path: '/syarat', name: () => t('footer.terms'), type: 'WebPage' },
};

const breadcrumb = (page) => {
  const url = abs(PAGE_META[page].path);
  const items = [{ name: t('nav.home'), url: `${BASE}/` }];
  if (page !== 'home') items.push({ name: PAGE_META[page].name(), url });
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })),
  };
};

const webpage = (page, title, description) => {
  const url = abs(PAGE_META[page].path);
  return {
    '@type': PAGE_META[page].type,
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: LANG,
    isPartOf: { '@id': SITE_ID },
    about: { '@id': ORG_ID },
    breadcrumb: { '@id': `${url}#breadcrumb` },
  };
};

/** Menu + MenuItem. Gizi hanya jika datanya ada ("420 kcal · 28g Protein"); harga hanya untuk menu Signature. */
function menu() {
  const priceByName = new Map(SIGNATURE_MENU.map((m) => [m.name, parseRupiah(m.price)]));
  const item = ({ name, info }) => {
    const out = { '@type': 'MenuItem', name };
    const nutrition = /(\d+)\s*kcal\s*·\s*(\d+)\s*g\s*Protein/i.exec(info || '');
    if (nutrition) {
      out.nutrition = { '@type': 'NutritionInformation', calories: `${nutrition[1]} kcal`, proteinContent: `${nutrition[2]} g` };
    }
    if (priceByName.has(name)) {
      out.offers = { '@type': 'Offer', price: priceByName.get(name), priceCurrency: 'IDR' };
    }
    return out;
  };
  return {
    '@type': 'Menu',
    '@id': `${BASE}/menu#menu`,
    name: `Menu ${SITE.name}`,
    inLanguage: LANG,
    hasMenuSection: MENU_CATEGORIES.map((cat) => ({
      '@type': 'MenuSection',
      name: t(cat.titleKey),
      hasMenuItem: cat.items.map(item),
    })),
  };
}

/** Paket langganan sebagai Product + Offer (mingguan dan bulanan). */
function plans() {
  return PLANS.map((p) => ({
    '@type': 'Product',
    '@id': `${BASE}/promo#plan-${p.id}`,
    name: p.name,
    description: `${p.target}. ${p.features.join('; ')}.`,
    brand: { '@type': 'Brand', name: SITE.name },
    offers: ['weekly', 'monthly'].map((period) => ({
      '@type': 'Offer',
      name: t(period === 'weekly' ? 'promo.weekly' : 'promo.monthly'),
      price: parseRupiah(p.price[period]),
      priceCurrency: 'IDR',
      url: `${BASE}/promo`,
      seller: { '@id': ORG_ID },
    })),
  }));
}

/** FAQPage dari teks FAQ yang sama dengan yang tampil di halaman. */
const faq = (page, items) => ({
  '@type': 'FAQPage',
  '@id': `${abs(PAGE_META[page].path)}#faq`,
  inLanguage: LANG,
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: t(item.questionKey),
    acceptedAnswer: { '@type': 'Answer', text: faqAnswer(item) },
  })),
});

/** Susun @graph untuk satu halaman. */
export function buildJsonLd(page, { title, description }) {
  const graph = [organization(), website(), webpage(page, title, description), breadcrumb(page)];
  if (page === 'menu') graph.push(menu());
  if (page === 'promo') graph.push(...plans(), faq('promo', FAQ_ITEMS));
  if (page === 'home') graph.push(faq('home', HOME_FAQ_ITEMS));
  return { '@context': 'https://schema.org', '@graph': graph };
}

/** Serialisasi aman untuk ditanam di <script>. */
export const toScriptTag = (data) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
