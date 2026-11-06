import { SITE } from '../config/site.js';

export const waLink = (message = '') =>
  `https://wa.me/${SITE.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

export const openWhatsApp = (message = '') => window.open(waLink(message), '_blank', 'noopener');
