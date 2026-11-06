/** Tiga kolom testimoni (kolom 1 turun, kolom 2 naik, kolom 3 turun). */
export const TESTIMONIAL_COLUMNS = [
  { direction: 'down', speed: 'slow', items: [
    { name: 'Sari', role: 'Bunda Sibuk', quoteKey: 'testi.sari' },
    { name: 'Andi', role: 'Software Engineer', quoteKey: 'testi.andi' },
  ] },
  { direction: 'up', speed: 'medium', items: [
    { name: 'Bima', role: 'Marketing Executive', quoteKey: 'testi.bima' },
    { name: 'Citra', role: 'Fitness Enthusiast', quoteKey: 'testi.citra' },
  ] },
  { direction: 'down', speed: 'fast', items: [
    { name: 'Reza', role: 'Content Creator', quoteKey: 'testi.reza' },
    { name: 'Nadia', role: 'Nutrition Enthusiast', quoteKey: 'testi.nadia' },
  ] },
];
