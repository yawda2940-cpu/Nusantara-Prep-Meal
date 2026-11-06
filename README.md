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
- Gambar: `assets/js/data/images.js` (untuk produksi, unduh ke `assets/images/`).

## Publikasi
Deploy ke Vercel (HTTPS). Tidak ada langkah build. Isi `GEMINI_API_KEY` di Environment Variables.
