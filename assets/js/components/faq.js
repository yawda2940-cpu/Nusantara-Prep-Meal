import { t } from '../i18n/i18n.js';
import { el, icon } from '../utils/dom.js';

/** Akordeon FAQ: hanya satu item terbuka pada satu waktu. */
export function renderFaq(container, items) {
  if (!container) return;
  const entries = items.map(({ questionKey, answerKey }, index) => {
    const panelId = `faq-panel-${index}`;
    const panel = el('div', { class: 'faq__content', id: panelId, role: 'region', hidden: true, text: t(answerKey) });
    const trigger = el('button', {
      class: 'faq__trigger',
      type: 'button',
      'aria-expanded': 'false',
      'aria-controls': panelId,
    }, el('span', { text: t(questionKey) }), icon('expand_more', 'faq__icon'));
    return el('div', { class: 'faq__item' }, trigger, panel);
  });

  container.replaceChildren(...entries);
  container.addEventListener('click', (event) => {
    const trigger = event.target.closest('.faq__trigger');
    if (!trigger) return;
    const willOpen = trigger.getAttribute('aria-expanded') !== 'true';
    container.querySelectorAll('.faq__item').forEach((item) => {
      const btn = item.querySelector('.faq__trigger');
      const open = btn === trigger && willOpen;
      btn.setAttribute('aria-expanded', String(open));
      item.querySelector('.faq__content').hidden = !open;
      item.classList.toggle('is-open', open);
    });
  }, { once: false });
}
