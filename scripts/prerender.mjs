#!/usr/bin/env node
/**
 * Pra-render SEO/GEO (tanpa dependensi, tanpa framework).
 *
 * Menulis konten Bahasa Indonesia langsung ke HTML supaya terbaca crawler tanpa JavaScript:
 *   1. Elemen statis ber-atribut data-i18n / data-i18n-html / -placeholder / -aria  -> teks ID.
 *   2. Region dinamis (navbar, footer, menu, paket, FAQ, testimoni) -> hasil kode render JS
 *      yang sama, dijalankan di Node dengan DOM mini (scripts/dom-shim.mjs). Satu sumber kebenaran.
 *   3. <img data-img> -> src, width, height, fetchpriority/decoding (anti-CLS, LCP).
 *   4. Tautan CSS: daftar @import main.css dibuka menjadi <link> paralel (tanpa waterfall).
 *   5. JSON-LD (scripts/jsonld.mjs) dibangun dari data yang sama dan ditanam sebelum </head>.
 *
 * Pemakaian:
 *   node scripts/prerender.mjs          # tulis hasil ke *.html
 *   node scripts/prerender.mjs --check  # gagal (exit 1) jika HTML belum sinkron
 * Jalankan ulang setiap kali mengubah assets/js/i18n/locales, assets/js/data, atau komponen.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { installShim, ShimElement } from './dom-shim.mjs';
import { buildJsonLd, toScriptTag } from './jsonld.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CHECK = process.argv.includes('--check');
const PAGES = [
  { file: 'index.html', page: 'home', script: 'assets/js/pages/home.js' },
  { file: 'about.html', page: 'about', script: 'assets/js/pages/about.js' },
  { file: 'menu.html', page: 'menu', script: 'assets/js/pages/menu.js' },
  { file: 'promo.html', page: 'promo', script: 'assets/js/pages/promo.js' },
  { file: 'contact.html', page: 'contact', script: 'assets/js/pages/contact.js' },
  { file: 'privasi.html', page: 'privasi', script: 'assets/js/pages/legal.js' },
  { file: 'syarat.html', page: 'syarat', script: 'assets/js/pages/legal.js' },
];
/** Region yang sengaja tidak dipra-render: chatbot (UI), marquee klien (dekoratif, aria-hidden). */
const SKIP_IDS = new Set(['site-chatbot', 'trust-track']);

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escAttr = (s) => esc(s).replace(/"/g, '&quot;');

const { t } = await import(pathToFileURL(join(ROOT, 'assets/js/i18n/i18n.js')));
const { IMAGES } = await import(pathToFileURL(join(ROOT, 'assets/js/data/images.js')));

/* ---------- 1. i18n statis ---------- */
function fillI18n(html) {
  // <tag ... data-i18n="k" ...>isi</tag> (elemen daun)
  html = html.replace(
    /<(\w+)(\s[^<>]*?\bdata-i18n(-html)?="([^"]+)"[^<>]*)>([\s\S]*?)<\/\1>/g,
    (_, tag, attrs, isHtml, key) => `<${tag}${attrs}>${isHtml ? t(key) : esc(t(key))}</${tag}>`
  );
  // atribut: placeholder dan aria-label
  const setAttr = (name, dataAttr) => (h) =>
    h.replace(new RegExp(`<(\\w+)(\\s[^<>]*?\\b${dataAttr}="([^"]+)"[^<>]*)>`, 'g'), (_, tag, attrs, key) => {
      const clean = attrs.replace(new RegExp(`\\s${name}="[^"]*"`, 'g'), '');
      return `<${tag}${clean} ${name}="${escAttr(t(key))}">`;
    });
  return setAttr('aria-label', 'data-i18n-aria')(setAttr('placeholder', 'data-i18n-placeholder')(html));
}

/* ---------- 2. region dinamis ---------- */
function dropDuplicateMarquee(node) {
  // Testimoni dirender 2x agar marquee mulus; versi statis cukup satu set.
  if (!(node instanceof ShimElement)) return;
  if (/\btesti-track\b/.test(node.className)) node.children = node.children.slice(0, node.children.length / 2);
  node.children.forEach(dropDuplicateMarquee);
}

function injectContainer(html, id, inner) {
  const re = new RegExp(`(<(?:div|header|footer)\\b[^>]*\\bid="${id}"[^>]*>)(?:<!--pr:start-->[\\s\\S]*?<!--pr:end-->)?(?=</(?:div|header|footer)>)`);
  if (!re.test(html)) throw new Error(`Container #${id} tidak ditemukan/kosong di HTML`);
  return html.replace(re, (_, open) => `${open}<!--pr:start-->${inner}<!--pr:end-->`);
}

/* ---------- 3. gambar ---------- */
function svgSize(file) {
  const head = readFileSync(join(ROOT, file), 'utf8').slice(0, 600);
  const w = /\swidth="(\d+)"/.exec(head), h = /\sheight="(\d+)"/.exec(head);
  if (w && h) return [w[1], h[1]];
  const vb = /viewBox="[\d.]+ [\d.]+ ([\d.]+) ([\d.]+)"/.exec(head);
  return vb ? [Math.round(vb[1]), Math.round(vb[2])] : null;
}
function fixImages(html) {
  return html.replace(/<img\b([^>]*?\sdata-img="([^"]+)"[^>]*?)>/g, (m, attrs, key) => {
    const src = IMAGES[key];
    if (!src) throw new Error(`data-img="${key}" tidak ada di images.js`);
    const size = svgSize(src.replace(/^\//, ''));
    let clean = attrs.replace(/\s(src|width|height|fetchpriority|decoding)="[^"]*"/g, '');
    const hero = /class="[^"]*\b(hero__img|promo-hero__img|contact-hero__bg)\b/.test(clean);
    let extra = ` src="${src}"`;
    if (size) extra += ` width="${size[0]}" height="${size[1]}"`;
    if (hero) extra += ' fetchpriority="high"';
    else if (/\sloading="lazy"/.test(clean)) extra += ' decoding="async"';
    return `<img${clean}${extra}>`;
  });
}

/* ---------- 4. CSS tanpa @import ---------- */
function cssLinks(html) {
  const main = readFileSync(join(ROOT, 'assets/css/main.css'), 'utf8');
  const files = [...main.matchAll(/@import url\('([^']+)'\)/g)].map((m) => m[1]);
  const block = `<!--css:start-->\n${files.map((f) => `  <link rel="stylesheet" href="/assets/css/${f}">`).join('\n')}\n  <!--css:end-->`;
  if (/<!--css:start-->/.test(html)) return html.replace(/<!--css:start-->[\s\S]*?<!--css:end-->/, () => block);
  return html.replace(/<link rel="stylesheet" href="assets\/css\/main\.css">/, () => block);
}

/* ---------- 5. JSON-LD ---------- */
const unesc = (v) => v.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
function injectJsonLd(html, page) {
  const title = unesc(/<title>(.*?)<\/title>/.exec(html)[1]);
  const description = unesc(/<meta name="description" content="([^"]*)"/.exec(html)[1]);
  const block = `<!--ld:start-->\n  ${toScriptTag(buildJsonLd(page, { title, description }))}\n  <!--ld:end-->`;
  if (/<!--ld:start-->/.test(html)) return html.replace(/<!--ld:start-->[\s\S]*?<!--ld:end-->/, () => block);
  return html.replace('</head>', () => `  ${block}\n</head>`);
}

/* ---------- jalankan ---------- */
let dirty = 0;
for (const { file, page, script } of PAGES) {
  const registry = installShim(page);
  await import(`${pathToFileURL(join(ROOT, script)).href}?page=${page}`);
  const path = join(ROOT, file);
  const original = readFileSync(path, 'utf8');
  let html = cssLinks(original);
  html = fillI18n(html);
  html = fixImages(html);
  html = injectJsonLd(html, page);
  for (const [id, node] of registry) {
    if (SKIP_IDS.has(id) || node.children.length === 0) continue;
    dropDuplicateMarquee(node);
    html = injectContainer(html, id, node.children.map((c) => c.toHTML()).join(''));
  }
  if (html !== original) {
    dirty++;
    if (CHECK) console.log(`BELUM SINKRON: ${file}`);
    else writeFileSync(path, html);
  }
  console.log(`${CHECK ? 'cek' : 'ok'}  ${file}  (${html.length} byte)`);
}
if (CHECK && dirty) { console.error(`${dirty} file belum sinkron. Jalankan: npm run seo:build`); process.exit(1); }
