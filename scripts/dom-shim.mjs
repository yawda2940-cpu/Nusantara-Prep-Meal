/**
 * DOM mini untuk pra-render (Node, tanpa dependensi).
 * Cukup untuk menjalankan kode render situs (el/icon/tr, navbar, footer, page renderer)
 * lalu menyerialisasi hasilnya menjadi HTML statis. Bukan implementasi DOM lengkap.
 */
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escAttr = (s) => esc(s).replace(/"/g, '&quot;');
const kebab = (s) => s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);

class TextNode {
  constructor(data) { this.data = String(data); }
  toHTML() { return esc(this.data); }
}
class RawNode {
  constructor(html) { this.html = String(html); }
  toHTML() { return this.html; }
}

export class ShimElement {
  constructor(tag) {
    this.tag = tag.toLowerCase();
    this.attrs = new Map();
    this.children = [];
    const self = this;
    this.dataset = new Proxy({}, {
      set(_, k, v) { self.attrs.set(`data-${kebab(String(k))}`, String(v)); return true; },
      get(_, k) { return self.attrs.get(`data-${kebab(String(k))}`); },
    });
    this.classList = {
      add: (...c) => self.#tokens((s) => c.forEach((x) => s.add(x))),
      remove: (...c) => self.#tokens((s) => c.forEach((x) => s.delete(x))),
      toggle: (c, force) => self.#tokens((s) => ((force ?? !s.has(c)) ? s.add(c) : s.delete(c))),
      contains: (c) => (self.attrs.get('class') || '').split(/\s+/).includes(c),
    };
  }
  #tokens(fn) {
    const s = new Set((this.attrs.get('class') || '').split(/\s+/).filter(Boolean));
    fn(s);
    s.size ? this.attrs.set('class', [...s].join(' ')) : this.attrs.delete('class');
  }
  get className() { return this.attrs.get('class') || ''; }
  set className(v) { v ? this.attrs.set('class', String(v)) : this.attrs.delete('class'); }
  set textContent(v) { this.children = [new TextNode(v)]; }
  get textContent() { return this.children.map((c) => c.data ?? '').join(''); }
  set innerHTML(v) { this.children = [new RawNode(v)]; }
  set placeholder(v) { this.attrs.set('placeholder', String(v)); }
  setAttribute(k, v) { this.attrs.set(k, String(v)); }
  getAttribute(k) { return this.attrs.has(k) ? this.attrs.get(k) : null; }
  hasAttribute(k) { return this.attrs.has(k); }
  #adopt(nodes) { return nodes.flat(Infinity).filter((n) => n !== null && n !== undefined && n !== false).map((n) => (typeof n === 'object' ? n : new TextNode(n))); }
  append(...nodes) { this.children.push(...this.#adopt(nodes)); }
  appendChild(node) { this.append(node); return node; }
  replaceChildren(...nodes) { this.children = this.#adopt(nodes); }
  addEventListener() {}
  removeEventListener() {}
  focus() {}
  querySelectorAll(sel) { return collect([this], sel, false); }
  querySelector(sel) { return collect([this], sel, false)[0] ?? null; }
  toHTML() {
    const attrs = [...this.attrs].map(([k, v]) => (v === '' ? ` ${k}` : ` ${k}="${escAttr(v)}"`)).join('');
    if (VOID.has(this.tag)) return `<${this.tag}${attrs}>`;
    return `<${this.tag}${attrs}>${this.children.map((c) => c.toHTML()).join('')}</${this.tag}>`;
  }
}

/** Selector yang didukung: [atribut] atau tag[atribut] (cukup untuk i18n dan data-*). */
function collect(roots, selector, includeRoots) {
  const m = /^(\w+)?\[([\w-]+)\]/.exec(selector.trim());
  if (!m) return [];
  const [, tag, attr] = m;
  const out = [];
  const walk = (n, isRoot) => {
    if (!(n instanceof ShimElement)) return;
    if ((!isRoot || includeRoots) && n.attrs.has(attr) && (!tag || n.tag === tag)) out.push(n);
    n.children.forEach((c) => walk(c, false));
  };
  roots.forEach((r) => walk(r, true));
  return out;
}

/** Pasang global document/window yang dibutuhkan kode situs. Kembalikan registry id -> node. */
export function installShim(pageName) {
  const registry = new Map();
  const document = {
    documentElement: { lang: 'id' },
    body: { dataset: { page: pageName } },
    createElement: (tag) => new ShimElement(tag),
    getElementById(id) {
      if (!registry.has(id)) registry.set(id, new ShimElement('div'));
      return registry.get(id);
    },
    querySelectorAll: (sel) => collect([...registry.values()], sel, true),
    querySelector: () => null,
    addEventListener() {},
    dispatchEvent() {},
  };
  globalThis.document = document;
  globalThis.window = { matchMedia: () => ({ matches: false }), addEventListener() {}, open() {}, scrollY: 0 };
  globalThis.localStorage = { getItem: () => null, setItem() {} };
  globalThis.CustomEvent = class {};
  globalThis.HTMLImageElement = class {};
  return registry;
}
