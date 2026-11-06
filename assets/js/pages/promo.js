import { bootstrap } from '../app.js';
import { renderFaq } from '../components/faq.js';
import { FAQ_ITEMS } from '../data/faq.js';
import { PLANS } from '../data/plans.js';
import { t } from '../i18n/i18n.js';
import { el, icon } from '../utils/dom.js';
import { openWhatsApp } from '../utils/whatsapp.js';

let period = 'weekly'; // 'weekly' | 'monthly'

function planCard(plan) {
  return el('article', { class: `plan-card${plan.featured ? ' plan-card--featured' : ''}` },
    plan.featured && el('div', { class: 'plan-card__popular font-mono', text: t('promo.popular') }),
    el('h3', { class: 'plan-card__name font-display', text: plan.name }),
    el('p', { class: 'plan-card__target font-mono', text: plan.target }),
    el('div', { class: 'plan-card__price-wrap' },
      el('span', { class: 'plan-card__price font-display', text: plan.price[period] }),
      el('span', { class: 'plan-card__period font-mono', text: t(period === 'weekly' ? 'promo.perWeek' : 'promo.perMonth') })
    ),
    el('ul', { class: 'plan-card__features' },
      plan.features.map((f) => el('li', {}, icon('check_circle', 'plan-card__check'), el('span', { text: f })))
    ),
    el('button', {
      class: `btn ${plan.featured ? 'btn--primary' : 'btn--outline'} btn--block btn--square`,
      type: 'button',
      text: t('promo.choose'),
      onclick: () => openWhatsApp(`Halo Nusantara Meal Prep, saya ingin berlangganan paket ${plan.name} (${t(period === 'weekly' ? 'promo.weekly' : 'promo.monthly')}).`),
    })
  );
}

function renderPlans() {
  document.getElementById('plans-grid').replaceChildren(...PLANS.map(planCard));
  document.querySelectorAll('[data-period]').forEach((btn) => {
    const active = btn.dataset.period === period;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-pressed', String(active));
  });
}

document.querySelectorAll('[data-period]').forEach((btn) =>
  btn.addEventListener('click', () => {
    period = btn.dataset.period;
    renderPlans();
  })
);

bootstrap(() => {
  renderPlans();
  renderFaq(document.getElementById('faq-list'), FAQ_ITEMS);
});
