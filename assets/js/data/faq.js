import { t } from '../i18n/i18n.js';
import { fillVars } from '../utils/format.js';
import { siteFacts } from './facts.js';

/** FAQ halaman Promo. Kunci pertanyaan/jawaban ada di locales (faq.q1 ... faq.a8). */
export const FAQ_ITEMS = Array.from({ length: 8 }, (_, i) => ({
  questionKey: `faq.q${i + 1}`,
  answerKey: `faq.a${i + 1}`,
}));

/** FAQ umum di Beranda (faqh.q1 ... faqh.a7). Jawaban boleh memuat {names}, {min}, {phone}, dll dari siteFacts(). */
export const HOME_FAQ_ITEMS = Array.from({ length: 7 }, (_, i) => ({
  questionKey: `faqh.q${i + 1}`,
  answerKey: `faqh.a${i + 1}`,
  vars: siteFacts(),
}));

/** Teks jawaban final (kunci terjemahan + variabel). Dipakai komponen FAQ dan JSON-LD. */
export const faqAnswer = ({ answerKey, vars }) => fillVars(t(answerKey), vars);
