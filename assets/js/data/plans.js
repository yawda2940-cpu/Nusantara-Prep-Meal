/** Paket langganan. Harga ditulis per periode agar toggle tinggal memilih. */
export const PLANS = [
  {
    id: 'duo',
    name: 'Duo Sehat',
    target: 'Untuk 2 Orang / 5 Hari',
    price: { weekly: 'Rp 850k', monthly: 'Rp 3.2M' },
    features: ['10 Porsi Makan Siang', 'Free Ongkir 3 Hari Pertama'],
  },
  {
    id: 'family',
    name: 'Family Pack',
    target: 'Untuk 4 Orang / 5 Hari',
    price: { weekly: 'Rp 1.6M', monthly: 'Rp 6M' },
    featured: true,
    features: ['20 Porsi Makan (Bisa Custom)', 'Free Ongkir Selamanya', 'Bonus 4 Minuman Herbal'],
  },
  {
    id: 'personal',
    name: 'Personal Pack',
    target: '1 Orang / 14 Hari',
    price: { weekly: 'Rp 1.1M', monthly: 'Rp 4M' },
    features: ['14 Porsi Makan Siang', 'Free Ongkir 1 Minggu'],
  },
];
