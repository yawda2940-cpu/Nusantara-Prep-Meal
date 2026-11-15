# Prompt Uji GEO – Nusantara Meal Prep

Tujuan: mengukur apakah AI search (a) menyebut Nusantara Meal Prep, (b) mengutip situs resmi, dan (c) menjawab dengan fakta yang benar.

## Cara menguji

1. **Alat:** ChatGPT (dengan Search aktif), Perplexity, Google AI Mode / AI Overviews, Gemini, Microsoft Copilot, Claude (dengan web search). Pakai mode tamu/incognito agar riwayat tidak memengaruhi hasil.
2. **Waktu:** uji sekali **sebelum** situs diindeks (baseline), lalu ulangi 2, 4, dan 8 minggu setelah sitemap dikirim ke Search Console dan Bing Webmaster.
3. **Ulang** setiap prompt 3 kali per alat (jawaban AI bervariasi). Catat tanggal, alat, dan versi/mode.
4. Isi tabel log (bagian 5). Gunakan fakta acuan (bagian 3) untuk menilai akurasi.
5. Mintalah kota/lokasi perangkat di Madiun bila alat menanyakannya, atau sebutkan "Madiun" di prompt (sudah ada).

## 1. Prompt uji

### A. Penemuan lokal (apakah merek muncul tanpa disebut)
1. `Rekomendasikan katering sehat langganan di Madiun. Sebutkan nama, kisaran harga, dan cara memesan.`
2. `Di Madiun ada layanan meal prep untuk diet atau pekerja kantoran? Beri 3 pilihan beserta sumbernya.`
3. `Cari katering makan siang sehat untuk kantor di Madiun, minimal 15 porsi per hari.`
4. `Katering diet langganan Madiun harga paket mingguan berapa?`

### B. Entitas (apakah AI mengenal merek)
5. `Apa itu Nusantara Meal Prep? Di mana lokasinya dan apa saja layanannya?`
6. `Apakah Nusantara Meal Prep di Madiun terpercaya? Apa saja paket dan menunya?`
7. `Bagaimana cara memesan Nusantara Meal Prep?`

### C. Fakta (uji akurasi, bandingkan dengan bagian 3)
8. `Berapa harga paket Duo Sehat, Family Pack, dan Personal Pack dari Nusantara Meal Prep?`
9. `Berapa kalori dan protein Nasi Kuning Nusantara dari Nusantara Meal Prep?`
10. `Bagaimana kebijakan pembatalan langganan Nusantara Meal Prep?`
11. `Apakah menu Nusantara Meal Prep memakai MSG atau pengawet?`

### D. Perbandingan dan keputusan
12. `Bandingkan layanan meal prep dan katering sehat di Madiun. Mana yang cocok untuk keluarga 4 orang?`
13. `Saya ingin langganan makan siang sehat di Madiun dengan anggaran sekitar Rp 1,6 juta per minggu. Apa pilihannya?`

### E. Anti-halusinasi (pertanyaan yang jawabannya TIDAK ada di situs)
14. `Jam buka Nusantara Meal Prep Madiun dan kode posnya apa?` (benar: AI harus menjawab tidak tahu / data belum tersedia)
15. `Berapa rating Google Maps Nusantara Meal Prep?` (benar: tidak ada data rating)
16. `Apakah Nusantara Meal Prep punya cabang di Surabaya?` (benar: tidak ada informasi cabang)

## 2. Kriteria penilaian per jawaban

| Metrik | Skala | Keterangan |
|---|---|---|
| Disebut | 0/1 | Nama "Nusantara Meal Prep" muncul |
| Dikutip | 0/1 | Tautan ke nusantara-prep-meal.vercel.app muncul sebagai sumber |
| Halaman benar | 0/1 | Sumber yang dikutip relevan (Menu untuk gizi, Promo untuk harga, dst.) |
| Akurasi | 0–2 | 2 = semua fakta benar, 1 = sebagian salah, 0 = salah/dikarang |
| Halusinasi | jumlah | Fakta tidak ada di situs (jam buka, rating, cabang, alamat lengkap) |
| Posisi | 1–n | Urutan merek dalam daftar rekomendasi (prompt A dan D) |

Skor sehat (target 8 minggu): Disebut ≥ 50% untuk prompt B, ≥ 20% untuk prompt A; Dikutip ≥ 50% untuk prompt B dan C; Akurasi rata-rata ≥ 1,7; Halusinasi 0 pada prompt E.

## 3. Fakta acuan (kebenaran per situs, per 15 November 2026)

- Layanan: meal prep dan katering sehat langganan, masakan Indonesia, Kota Madiun, Jawa Timur. Lokasi: Jalan Pahlawan, Kota Madiun.
- Paket: Duo Sehat (2 orang/5 hari, 10 porsi makan siang; Rp 850k per minggu, Rp 3.2M per bulan); Family Pack (4 orang/5 hari, 20 porsi; Rp 1.6M per minggu, Rp 6M per bulan; bonus 4 minuman herbal); Personal Pack (1 orang/14 hari, 14 porsi; Rp 1.1M per minggu, Rp 4M per bulan).
- Harga menu signature: Rp 32.000 sampai Rp 65.000.
- Nasi Kuning Nusantara: 420 kcal, 28 g protein.
- Katering kantor: minimal 15 porsi per hari.
- Pesan: WhatsApp 087881485375; email yawda2940@gmail.com; Instagram @yawdasaja.
- Pembatalan: paling lambat 2 hari kerja sebelum pengiriman berikutnya; sisa dana dikembalikan setelah dipotong biaya administrasi standar.
- Tanpa MSG sintetis dan pengawet kimiawi; kemasan biodegradable.
- **Tidak ada di situs:** jam buka, kode pos, nomor jalan, rating/ulasan Google, cabang lain.

## 4. Meta-prompt untuk menilai hasil (tempel ke Claude/ChatGPT bersama jawaban yang Anda salin)

```
Kamu auditor GEO. Saya menguji apakah AI search menyebut dan mengutip "Nusantara Meal Prep" (Madiun, https://nusantara-prep-meal.vercel.app).

FAKTA ACUAN:
[tempel bagian 3 di atas]

Di bawah ini jawaban AI untuk satu prompt. Nilai dalam tabel:
Disebut (0/1), Dikutip (0/1), Halaman benar (0/1), Akurasi (0-2), Halusinasi (daftar fakta yang tidak ada di FAKTA ACUAN), Posisi (urutan merek).
Lalu beri 3 saran konkret perubahan konten situs (kalimat/tabel/FAQ) yang akan memperbaiki skor, tanpa mengarang data baru.

PROMPT: [tempel prompt]
ALAT & TANGGAL: [mis. Perplexity, 20 Des 2026]
JAWABAN AI:
[tempel jawaban lengkap beserta sumber]
```

## 5. Template log (salin ke spreadsheet)

| Tanggal | Alat | No. prompt | Ulangan | Disebut | Dikutip | Halaman benar | Akurasi | Halusinasi | Posisi | Catatan |
|---|---|---|---|---|---|---|---|---|---|---|
| | | | 1 | | | | | | | |

## 6. Jika hasil buruk

- **Tidak disebut sama sekali:** periksa pengindeksan (Search Console "Inspeksi URL"), kirim ulang sitemap, pastikan `robots.txt` mengizinkan crawler AI, dan bangun sinyal luar (GBP, Instagram, direktori lokal, liputan media lokal).
- **Dikutip tetapi salah:** perbarui kalimat sumber di halaman terkait (Promo/Menu/FAQ), lalu `npm run seo:build`.
- **Halusinasi:** tambahkan data yang hilang secara resmi (jam buka, alamat lengkap) ke situs dan GBP, lalu perbarui JSON-LD.
