import { el } from './dom.js';

/** Tabel data aksesibel: caption (untuk pembaca layar), th scope, kolom pertama sebagai row header. */
export function dataTable({ caption, headers, rows, className = '' }) {
  return el('div', { class: 'table-wrap' },
    el('table', { class: `data-table ${className}`.trim() },
      el('caption', { class: 'sr-only', text: caption }),
      headers && el('thead', {}, el('tr', {}, headers.map((h) => el('th', { scope: 'col', text: h })))),
      el('tbody', {}, rows.map((row) =>
        el('tr', {}, row.map((cell, i) => (i === 0 ? el('th', { scope: 'row', text: cell }) : el('td', { text: cell }))))
      ))
    )
  );
}
