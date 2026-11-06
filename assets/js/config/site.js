/**
 * Konfigurasi situs. Semua kontak dan konstanta ada di sini (satu sumber kebenaran).
 */
export const SITE = {
  name: 'Nusantara Meal Prep',
  whatsapp: '6287881485375',
  phoneDisplay: '087881485375',
  email: 'yawda2940@gmail.com',
  instagram: 'yawdasaja',
  address: 'Kota Madiun, Indonesia',
  mapQuery: 'Jalan Pahlawan, Madiun',
  chat: {
    title: 'Nusantara CS',
    persona: 'MinTar',
    endpoint: '/api/chat',
    maxHistory: 12,
  },
  defaultLang: 'id',
  langStorageKey: 'nmp-lang',
};

export const instagramUrl = () => `https://instagram.com/${SITE.instagram}`;
