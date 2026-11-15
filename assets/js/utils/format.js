/** Pembantu format angka/teks yang dipakai halaman dan skrip pra-render (satu sumber). */

/** "Rp 45.000" -> 45000 ; "Rp 850k" -> 850000 ; "Rp 1.6M" -> 1600000 */
export function parseRupiah(text) {
  const m = /Rp\s*([\d.,]+)\s*([kKmM]?)/.exec(text);
  if (!m) throw new Error(`Harga tidak terbaca: ${text}`);
  const [, num, unit] = m;
  if (!unit) return Number(num.replace(/[.,]/g, ''));
  return Math.round(parseFloat(num.replace(',', '.')) * (unit.toLowerCase() === 'k' ? 1e3 : 1e6));
}

/** 850000 -> "Rp 850.000" (deterministik, tidak bergantung ICU). */
export const formatRupiah = (n) => `Rp ${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;

/** Ganti {kunci} pada teks dengan nilai dari vars. */
export const fillVars = (text, vars = {}) => text.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
