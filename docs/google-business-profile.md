# Panduan Google Business Profile (GBP) – Nusantara Meal Prep

Tujuan: muncul di Google Maps dan hasil pencarian lokal ("katering sehat Madiun", "meal prep Madiun"), dan menjadi sumber yang konsisten bagi AI search. Data di bawah harus **persis sama** dengan yang ada di situs (jalankan `npm run seo:nap` untuk memeriksa situs).

## 1. Data NAP baku (salin persis)

| Kolom | Isi | Status |
|---|---|---|
| Nama bisnis | Nusantara Meal Prep | dari situs |
| Alamat | Jalan Pahlawan, Kota Madiun, Jawa Timur, Indonesia | **[ISI DATA]** nomor jalan dan kode pos |
| Telepon | 087881485375 (WhatsApp: wa.me/6287881485375) | dari situs |
| Email | yawda2940@gmail.com | dari situs (pertimbangkan email bisnis sendiri) |
| Situs web | https://nusantara-prep-meal.vercel.app/ | dari situs |
| Instagram | https://instagram.com/yawdasaja | dari situs |
| Jam buka | **[ISI DATA]** | belum ada di situs |
| Area layanan | Kota Madiun **[ISI DATA: tambah kecamatan/kota sekitar yang benar-benar dilayani]** | konfirmasi |

Aturan: jangan ubah ejaan, singkatan, atau urutan nama/alamat/telepon antar platform (GBP, Instagram, WhatsApp Business, direktori). Perbedaan kecil melemahkan sinyal entitas.

## 2. Langkah pembuatan

1. Buka https://business.google.com dan buat profil dengan akun Google bisnis (bukan akun pribadi bila memungkinkan).
2. Isi nama persis seperti tabel. Jangan menambahkan kata kunci pada nama ("Nusantara Meal Prep – Katering Murah Madiun" melanggar kebijakan dan bisa ditangguhkan).
3. Kategori utama: pilih yang paling dekat dengan layanan, misalnya **Katering** (Caterer). Kategori tambahan: pilih hanya yang benar-benar sesuai dari daftar GBP (mis. layanan pengiriman makanan/penyedia makanan sehat bila tersedia). Cek daftar kategori GBP saat mengisi karena namanya dapat berubah.
4. Tentukan model bisnis: jika pelanggan tidak datang ke lokasi, pilih **bisnis area layanan** dan sembunyikan alamat bila perlu; jika menerima tamu, tampilkan alamat dan jam buka.
5. Selesaikan verifikasi (video/kode pos/telepon sesuai opsi yang muncul).

## 3. Deskripsi bisnis (maks. 750 karakter, siap tempel)

> Nusantara Meal Prep adalah layanan meal prep dan katering sehat langganan di Kota Madiun. Masakan khas Indonesia dengan kalori dan protein tertera di setiap menu, rempah segar tanpa MSG sintetis dan pengawet kimiawi, kemasan biodegradable, dan pengiriman harian. Tersedia paket Duo Sehat, Family Pack, dan Personal Pack, serta langganan makan siang untuk kantor (minimal 15 porsi per hari). Pesan lewat WhatsApp 087881485375.

## 3b. Produk dan layanan (isi di GBP)

- Duo Sehat: 2 orang / 5 hari, 10 porsi makan siang, Rp 850k per minggu (Rp 3.2M per bulan).
- Family Pack: 4 orang / 5 hari, 20 porsi (bisa custom), Rp 1.6M per minggu (Rp 6M per bulan).
- Personal Pack: 1 orang / 14 hari, 14 porsi makan siang, Rp 1.1M per minggu (Rp 4M per bulan).
- Katering kantor: langganan makan siang tim, minimal 15 porsi per hari.

Harga harus sama dengan halaman Promo. Perbarui GBP setiap harga di situs berubah.

## 4. Foto dan konten

- Unggah **foto asli** (dapur, proses memasak, kemasan, menu, tim). Hindari ilustrasi/stok.
- Minimal: logo, foto sampul, 10+ foto menu dan kemasan. Perbarui rutin.
- Posting update mingguan (menu baru, promo) dengan tautan ke halaman terkait.
- Tautan situs: `https://nusantara-prep-meal.vercel.app/?utm_source=google&utm_medium=organic&utm_campaign=gbp` (agar kunjungan dari GBP terbaca di analytics).
- Tautan pesan: WhatsApp https://wa.me/6287881485375.

## 5. Ulasan

- Minta ulasan **asli** dari pelanggan nyata (kirim tautan ulasan GBP lewat WhatsApp setelah pesanan selesai).
- Jangan membeli, menukar dengan hadiah, atau menulis ulasan sendiri. Itu melanggar kebijakan Google dan merusak kepercayaan.
- Balas semua ulasan dengan sopan dan spesifik. Jangan menambahkan rating ke JSON-LD situs sebelum ada data ulasan yang bisa diverifikasi publik.

## 6. Setelah GBP aktif

1. Lengkapi alamat lengkap di situs (nomor jalan, kode pos) lalu minta saya menambahkan `streetAddress`/`postalCode`/`openingHoursSpecification` ke `scripts/jsonld.mjs` (properti hanya ditambahkan bila datanya ada).
2. Tambahkan URL GBP (tautan "Bagikan profil") ke `sameAs` pada JSON-LD.
3. Daftarkan situs di **Google Search Console** (Domain atau URL-prefix), kirim `sitemap.xml`, dan minta pengindeksan halaman beranda.
4. Daftarkan juga di **Bing Webmaster Tools** dan kirim sitemap (Microsoft Copilot dan sebagian mesin AI memakai indeks Bing).
5. Cantumkan NAP yang sama di Instagram, WhatsApp Business, dan direktori lokal/marketplace yang Anda pakai.
6. Pertimbangkan domain sendiri (mis. `.id` atau `.com`) untuk otoritas jangka panjang; setelah ganti domain, perbarui canonical, sitemap, robots.txt, OG, JSON-LD (`BASE` di `scripts/jsonld.mjs`), lalu jalankan `npm run seo:build`.

## 7. Checklist

- [ ] NAP identik di situs, GBP, Instagram, WhatsApp Business
- [ ] Alamat lengkap + jam buka diisi
- [ ] Kategori utama dan tambahan sesuai
- [ ] Deskripsi, produk/layanan, dan harga sama dengan situs
- [ ] Foto asli diunggah
- [ ] Search Console dan Bing Webmaster: sitemap terkirim
- [ ] Sistem meminta ulasan asli berjalan
