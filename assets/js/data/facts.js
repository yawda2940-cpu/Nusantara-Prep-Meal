import { SITE } from '../config/site.js';
import { formatRupiah, parseRupiah } from '../utils/format.js';
import { PLANS } from './plans.js';
import { SIGNATURE_MENU } from './menu.js';

/** Fakta bisnis turunan dari data situs, dipakai di tabel "Fakta Singkat", FAQ, dan JSON-LD. */
export function siteFacts() {
  const weekly = PLANS.map((p) => parseRupiah(p.price.weekly));
  const menu = SIGNATURE_MENU.map((m) => parseRupiah(m.price));
  return {
    names: PLANS.map((p) => p.name).join(', '),
    min: formatRupiah(Math.min(...weekly)),
    menuMin: formatRupiah(Math.min(...menu)),
    menuMax: formatRupiah(Math.max(...menu)),
    phone: SITE.phoneDisplay,
    street: SITE.mapQuery.split(',')[0].trim(),
  };
}
