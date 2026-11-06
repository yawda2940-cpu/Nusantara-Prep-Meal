/** Kunci pertanyaan/jawaban ada di locales (faq.q1 ... faq.a8). */
export const FAQ_ITEMS = Array.from({ length: 8 }, (_, i) => ({
  questionKey: `faq.q${i + 1}`,
  answerKey: `faq.a${i + 1}`,
}));
