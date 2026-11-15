# Nusantara Meal Prep

Situs statis multi-halaman (HTML, CSS, JavaScript biasa, tanpa framework dan tanpa build).

## Menjalankan
- Tanpa chatbot: `npm run dev` (membuka server statis; wajib lewat server karena memakai ES Module).
- Dengan chatbot: salin `.env.example` menjadi `.env`, isi `GEMINI_API_KEY`, lalu `npm run dev:api`.

## Struktur
- `*.html` : lima halaman (index, about, menu, promo, contact). HTML hanya kerangka; teks lewat `data-i18n`, konten berulang dirender dari `assets/js/data/`.
- `assets/css/` : `main.css` (impor CSS bersama) + `base/`, `components/`, `pages/`.
- `assets/js/` : `config/`, `i18n/`, `data/`, `components/`, `utils/`, `pages/`, `app.js`.
- `api/chat.js` : fungsi serverless chatbot.

## Cara mengubah
- Nomor WA, email, Instagram: `assets/js/config/site.js`.
- Warna, font, radius: `assets/css/base/tokens.css`.
- Teks (ID/EN): `assets/js/i18n/locales/`. Kunci yang belum ada di `en.js` otomatis memakai teks Indonesia.
- Menu, paket, FAQ, testimoni: `assets/js/data/`.
- Gambar: file lokal di `assets/images/`, dipetakan di `assets/js/data/images.js`. Ganti dengan foto asli dengan menimpa file (atau ubah nama file di `images.js`). Jangan hotlink ke URL pihak ketiga (mis. googleusercontent) karena bisa kedaluwarsa.

## Publikasi
Deploy ke Vercel (HTTPS). Tidak ada langkah build. Isi `GEMINI_API_KEY` di Environment Variables.

## SEO & pra-render
HTML dipra-render supaya konten terbaca crawler tanpa JavaScript (penting untuk Google dan AI search).
- Setelah mengubah `assets/js/i18n/locales/`, `assets/js/data/`, komponen, atau CSS bersama, jalankan `npm run seo:build` lalu commit hasilnya.
- `npm run seo:check` memastikan HTML sudah sinkron (gagal jika belum). Cocok dipakai di CI.
- Skrip: `scripts/prerender.mjs` (menjalankan kode render JS yang sama di Node) dan `scripts/dom-shim.mjs` (DOM mini). Tidak ada dependensi.
- Bagian di antara `<!--pr:start-->` dan `<!--pr:end-->` serta `<!--css:start-->` dan `<!--css:end-->` dibuat otomatis; jangan diedit manual.
- Domain produksi (canonical, sitemap, OG) ada di tag `<head>` tiap halaman, `sitemap.xml`, dan `robots.txt`.
- JSON-LD (FoodEstablishment, WebSite, BreadcrumbList, Menu, Product/Offer, FAQPage) dibangun oleh `scripts/jsonld.mjs` dari data situs yang sama dan ditanam otomatis antara `<!--ld:start-->` dan `<!--ld:end-->`. Review/rating sengaja tidak dimasukkan.

## Dokumen SEO/GEO
- `docs/SEO-HANDOFF.md`: ringkasan, data yang perlu dilengkapi, urutan setelah deploy
- `docs/google-business-profile.md`: panduan Google Business Profile dan NAP baku
- `docs/geo-test-prompts.md`: prompt dan rubrik uji GEO di berbagai LLM
- Skrip: `npm run seo:build`, `npm run seo:check`, `npm run seo:nap`, `npm run seo:verify`
