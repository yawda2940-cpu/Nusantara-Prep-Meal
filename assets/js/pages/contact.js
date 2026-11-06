import { bootstrap } from '../app.js';
import { SITE } from '../config/site.js';
import { t } from '../i18n/i18n.js';
import { openWhatsApp } from '../utils/whatsapp.js';

/** Form tidak menyimpan data: isinya dirangkai menjadi pesan WhatsApp di browser. */
function buildMessage(data) {
  const lines = [
    t('contact.wa.greeting'),
    '',
    `Nama: ${data.get('name')}`,
    data.get('company') && `Perusahaan: ${data.get('company')}`,
    `Telepon/WA: ${data.get('phone')}`,
    `Email: ${data.get('email')}`,
    `Subjek: ${data.get('subject')}`,
    '',
    data.get('message'),
  ];
  return lines.filter((line) => line !== '' ? Boolean(line) : true).join('\n');
}

document.getElementById('contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  openWhatsApp(buildMessage(new FormData(event.currentTarget)));
});

// Alamat peta diisi dari config agar tidak ada nilai ganda di HTML.
document.getElementById('map-frame').src =
  `https://www.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}&output=embed`;

bootstrap();
