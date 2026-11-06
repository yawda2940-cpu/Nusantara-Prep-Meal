import { IMAGES as I } from './images.js';

/** Warna tag: bata | tua | hijau | abu */
const tag = (text, color) => ({ text, color });

/** Menu Signature di Beranda */
export const SIGNATURE_MENU = [
  { name: 'Nasi Kuning Nusantara', img: I.nasiKuning, tag: 'Best Seller', origin: 'Tradisional', rating: '4.9', reviews: 128, price: 'Rp 45.000' },
  { name: 'Rawon Daging Premium', img: I.rendang, tag: 'High Protein', origin: 'Jawa Timur', rating: '4.8', reviews: 86, price: 'Rp 65.000' },
  { name: 'Gado-Gado Siram', img: I.gado, tag: 'Plant-Based', origin: 'Betawi', rating: '4.7', reviews: 254, price: 'Rp 35.000' },
  { name: 'Ikan Bakar Jimbaran', img: I.fish, tag: 'Fresh Catch', origin: 'Bali', rating: '4.9', reviews: 112, price: 'Rp 55.000' },
  { name: 'Sate Ayam Madura', img: I.sateAyam, tag: 'Signature', origin: 'Madura', rating: '4.9', reviews: 178, price: 'Rp 48.000' },
  { name: 'Pecel Madiun Sehat', img: I.pecelSehat, tag: 'Low Calorie', origin: 'Jawa Timur', rating: '4.8', reviews: 92, price: 'Rp 32.000' },
];

/** Halaman Menu: tiga kategori carousel */
export const MENU_CATEGORIES = [
  {
    id: 'track-utama',
    titleKey: 'menu.cat.main',
    items: [
      { name: 'Nasi Kuning Nusantara', img: I.nasiKuning, tag: tag('BEST SELLER', 'bata'), info: '420 kcal · 28g Protein' },
      { name: 'Ayam Betutu Gianyar', img: I.betutu, tag: tag('HIGH PROTEIN', 'tua'), info: '380 kcal · 42g Protein' },
      { name: 'Rendang Daging Padang', img: I.rendang, info: '520 kcal · 45g Protein' },
      { name: 'Sate Lilit Ikan', img: I.fish, info: '310 kcal · 32g Protein' },
      { name: 'Pecel Madiun', img: I.pecel, info: '340 kcal · 18g Protein' },
      { name: 'Gado-Gado Premium', img: I.gado, tag: tag('PLANT-BASED', 'hijau'), info: '410 kcal · 22g Protein' },
      { name: 'Nasi Bakar Ayam Suwir', img: I.nasiKuning, info: '450 kcal · 35g Protein' },
      { name: 'Rawon Daging Rendah Lemak', img: I.rendang, info: '280 kcal · 35g Protein' },
      { name: 'Ikan Bakar Jimbaran', img: I.fish, info: '320 kcal · 38g Protein' },
      { name: 'Sop Buntut Clear', img: I.rendang, info: '480 kcal · 40g Protein' },
      { name: 'Dendeng Balado', img: I.betutu, info: '440 kcal · 36g Protein' },
      { name: 'Pepes Ikan Kakap', img: I.fish, info: '290 kcal · 34g Protein' },
    ],
  },
  {
    id: 'track-minuman',
    titleKey: 'menu.cat.drinks',
    items: [
      { name: 'Es Kunyit Asam', img: I.kunyit, tag: tag('NEW', 'bata'), info: 'Detox & Anti-Inflammatory' },
      { name: 'Jus Alpukat Pure', img: I.pecel, tag: tag('HEALTHY FAT', 'hijau'), info: 'Rich in Omega-3' },
      { name: 'Es Kelapa Muda', img: I.fish, info: 'Natural Electrolytes' },
      { name: 'Jamu Beras Kencur', img: I.kunyit, info: 'Energy Booster' },
      { name: 'Wedang Jahe', img: I.kunyit, info: 'Immune Support' },
      { name: 'Jus Sirsak Fresh', img: I.gado, info: 'Vitamin C Rich' },
    ],
  },
  {
    id: 'track-dessert',
    titleKey: 'menu.cat.dessert',
    items: [
      { name: 'Bubur Sumsum Modern', img: I.nasiKuning, tag: tag('CLASSIC', 'abu') },
      { name: 'Klepon Cake', img: I.pecel, tag: tag('SIGNATURE', 'bata') },
      { name: 'Dadar Gulung Artisanal', img: I.gado },
      { name: 'Lapis Legit Premium', img: I.betutu },
      { name: 'Es Pisang Ijo', img: I.pecel },
      { name: 'Bika Ambon Modern', img: I.nasiKuning },
      { name: 'Puding Kelapa Muda', img: I.fish },
      { name: 'Serabi Solo', img: I.gado },
      { name: 'Kue Lumpur', img: I.nasiKuning },
    ],
  },
];

/** Tiga foto hero halaman Menu */
export const MENU_HERO_CARDS = [
  { img: I.nasiKuning, label: 'Tinggi Protein', title: 'Otot Kuat', color: 'putih' },
  { img: I.gado, label: 'Plant-Based', title: 'Serat Alami', color: 'hijau' },
  { img: I.fish, label: 'Low Carb', title: 'Diet Ringan', color: 'bata' },
];
