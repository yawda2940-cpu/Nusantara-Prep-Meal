# Serah-Terima SEO & GEO – Nusantara Meal Prep

Domain saat ini: https://nusantara-prep-meal.vercel.app (target: Indonesia, fokus Kota Madiun, satu bahasa terindeks: Indonesia).

## Alur kerja harian
1. Ubah teks di `assets/js/i18n/locales/id.js` (dan `en.js`), data di `assets/js/data/`, atau komponen.
2. Jalankan `npm run seo:build` (menulis ulang konten statis dan JSON-LD ke HTML).
3. Jalankan `npm run seo:verify` (HTML sinkron + konsistensi NAP).
4. Commit semua file yang berubah, deploy ke Vercel.

Catatan: ubah title/description/OG langsung di tiap file `.html` (bagian `<head>`); JSON-LD otomatis mengikutinya.

## Yang sudah ada
- Meta unik per halaman, canonical, Open Graph, Twitter Card, favicon, theme-color
- `robots.txt` (crawler AI sah diizinkan, `/api/` ditutup), `sitemap.xml` (7 URL), `llms.txt`
- Konten pra-render di HTML (terbaca tanpa JavaScript), HTML semantik, hierarki heading rapi
- JSON-LD: FoodEstablishment, WebSite, WebPage/AboutPage/ContactPage, BreadcrumbList, Menu + MenuItem (gizi), Product + Offer (paket), FAQPage (Beranda dan Promo)
- Konten GEO: definisi + "Fakta Singkat" + FAQ umum (Beranda), tabel perbandingan paket (Promo), tabel gizi (Menu)
- Gambar ber-ukuran (anti-CLS), `fetchpriority` hero, font ikon di-subset, CSS tanpa `@import`
- URL bersih (`/about`, `/menu`, dst.), cache aset, halaman `/privasi` dan `/syarat`

## Data yang MASIH perlu Anda lengkapi (sengaja tidak dikarang)
| Data | Di mana dipakai | Cara menambahkan |
|---|---|---|
| Nomor jalan dan kode pos | JSON-LD `address`, footer, GBP | `site.js` (`address`, `mapQuery`) + `scripts/jsonld.mjs` (`postalCode`) |
| Jam buka | JSON-LD `openingHoursSpecification`, GBP | tambahkan ke `scripts/jsonld.mjs` |
| Koordinat (geo) | JSON-LD `geo` | tambahkan ke `scripts/jsonld.mjs` |
| URL Google Business Profile | JSON-LD `sameAs` | tambahkan ke `sameAs` |
| Nomor NIB dan P-IRT | halaman Tentang/footer (klaim sudah tampil tanpa nomor) | tambahkan ke teks |
| Foto asli makanan | `og-cover.png`, gambar menu | ganti file di `assets/images/` |
| Nama badan usaha dan masa simpan data | `/privasi`, `/syarat` (ada komentar TODO) | edit HTML lalu tinjau bersama penasihat hukum |
| Status stok pada Offer | JSON-LD Product | opsional |

## Hal yang sengaja TIDAK dipasang
- `Review` / `AggregateRating`: ulasan di situs ditulis bisnis sendiri, tidak memenuhi syarat rich result dan berisiko dianggap spam. Pasang hanya bila ada ulasan publik yang bisa diverifikasi.
- `hreflang`: situs hanya satu bahasa terindeks. Tombol EN adalah fitur pengunjung (tanpa URL terpisah).

## Perlu keputusan Anda
- Bar "Dipercaya oleh tim di" (TechCorp, StartupX, dll.) tampil di Beranda dan tidak masuk JSON-LD. Jika itu placeholder, ganti dengan klien nyata atau hapus (`assets/js/data/clients.js` lalu `npm run seo:build`).
- Klaim promo yang tampil (diskon 15%, free ongkir selamanya, poin reward 12 bulan): pastikan masih berlaku.
- H1 Beranda ("Nutrisi Modern Cita Rasa Nusantara") belum memuat "Madiun" agar desain/copy tidak berubah. Opsional: tambahkan "Katering Sehat Madiun" sebagai teks kecil di atas H1.

## Setelah deploy (urutan)
1. Cek `/robots.txt`, `/sitemap.xml`, `/llms.txt`, dan `/about.html` (harus dialihkan ke `/about`).
2. Rich Results Test untuk `/`, `/menu`, `/promo`; validator.schema.org untuk semua halaman.
3. PageSpeed Insights (mobile) untuk `/`, `/menu`, `/promo`. Target LCP < 2,5 s, CLS < 0,1, INP < 200 ms.
4. Google Search Console: tambahkan properti, kirim sitemap, minta pengindeksan beranda.
5. Bing Webmaster Tools: kirim sitemap.
6. Buat dan lengkapi Google Business Profile (`docs/google-business-profile.md`).
7. Uji GEO di LLM (`docs/geo-test-prompts.md`): baseline, lalu ulangi 2, 4, 8 minggu.
8. Pastikan `GEMINI_API_KEY` terisi di Vercel agar chatbot berjalan.
