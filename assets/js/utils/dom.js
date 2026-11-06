/** Pembantu DOM kecil agar render data tetap ringkas dan aman (tanpa innerHTML dari data). */
export function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    if (value === null || value === undefined || value === false) continue;
    if (key === 'class') node.className = value;
    else if (key === 'text') node.textContent = value;
    else if (key === 'dataset') Object.assign(node.dataset, value);
    else if (key.startsWith('on') && typeof value === 'function') node.addEventListener(key.slice(2).toLowerCase(), value);
    else node.setAttribute(key, value === true ? '' : value);
  }
  node.append(...children.flat().filter((c) => c !== null && c !== undefined && c !== false));
  return node;
}

/** Ikon Material Symbols. */
export const icon = (name, extraClass = '') =>
  el('span', { class: `material-symbols-outlined ${extraClass}`.trim(), 'aria-hidden': 'true', text: name });

/** Elemen yang teksnya diterjemahkan oleh i18n.js. */
export const tr = (key, tagName = 'span', props = {}) => el(tagName, { ...props, 'data-i18n': key });
