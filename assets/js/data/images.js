/**
 * Daftar gambar situs. Semua file disimpan lokal di assets/images/ (tidak lagi hotlink ke
 * server pihak ketiga yang bisa kedaluwarsa). Untuk mengganti dengan foto asli, timpa file
 * di assets/images/ atau ubah nama file di sini.
 *
 * Path dibuat absolut dari root situs agar tetap benar di semua halaman.
 */
const D = '/assets/images/';

export const IMAGES = {
  logo: D + 'logo.svg',
  kitchen: D + 'dapur.svg',
  building: D + 'gedung.svg',
  nasiKuning: D + 'nasi-kuning.svg',
  betutu: D + 'ayam-betutu.svg',
  rendang: D + 'rendang.svg',
  fish: D + 'ikan-bakar.svg',
  pecel: D + 'pecel.svg',
  gado: D + 'gado-gado.svg',
  kunyit: D + 'kunyit-asam.svg',
  catering: D + 'catering.svg',
  sateAyam: D + 'sate-ayam.svg',
  pecelSehat: D + 'pecel-sehat.svg',
  aboutKitchen: D + 'dapur-keluarga.svg',
  spices: D + 'rempah.svg',
  chefs: D + 'chef.svg',
};

/** Gambar cadangan jika sebuah file gagal dimuat (SVG inline, tanpa permintaan jaringan). */
export const FALLBACK_IMAGE =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="#E5EADC"/><circle cx="200" cy="150" r="52" fill="#F7F5EE" stroke="#45664B" stroke-width="6"/><path d="M200 182c-16-8-16-30 0-44 16 14 16 36 0 44z" fill="#45664B"/></svg>'
  );
