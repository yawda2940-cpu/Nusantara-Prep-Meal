#!/usr/bin/env node
/**
 * Pemeriksa konsistensi NAP (Name, Address, Phone) dan kontak.
 * Memastikan nama, telepon, email, dan Instagram di seluruh HTML, llms.txt, dan docs
 * identik dengan assets/js/config/site.js (sumber kebenaran). Exit 1 bila ada yang berbeda.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE } from '../assets/js/config/site.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const files = [...readdirSync(ROOT).filter((f) => /\.(html|txt)$/.test(f)), ...readdirSync(join(ROOT, 'docs')).map((f) => `docs/${f}`)];
const PLACEHOLDER_EMAIL = 'nama@email.com'; // contoh isian di formulir kontak, bukan data bisnis
const problems = [];

for (const f of files) {
  const text = readFileSync(join(ROOT, f), 'utf8');
  // nomor telepon Indonesia: 08xx... atau 628xx... atau +628xx...
  for (const m of text.matchAll(/(?<![\d])(?:\+?62|0)8\d{8,12}(?![\d])/g)) {
    const n = m[0].replace(/^\+/, '');
    if (n !== SITE.phoneDisplay && n !== SITE.whatsapp) problems.push(`${f}: nomor berbeda "${m[0]}"`);
  }
  for (const m of text.matchAll(/[\w.+-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}/g)) {
    if (m[0].toLowerCase() !== SITE.email && m[0] !== PLACEHOLDER_EMAIL) problems.push(`${f}: email berbeda "${m[0]}"`);
  }
  for (const m of text.matchAll(/instagram\.com\/([\w.]+)/g)) if (m[1] !== SITE.instagram) problems.push(`${f}: Instagram berbeda "${m[1]}"`);
  if (/Nusantara\s+Meal\s*Prep/i.test(text) && /Nusantara\s+Prep\s+Meal/i.test(text)) problems.push(`${f}: variasi nama merek ("Nusantara Prep Meal")`);
}
console.log(`NAP dicek di ${files.length} file: ${SITE.name} | ${SITE.phoneDisplay} | ${SITE.email} | @${SITE.instagram} | ${SITE.mapQuery}`);
if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
console.log('NAP konsisten.');
