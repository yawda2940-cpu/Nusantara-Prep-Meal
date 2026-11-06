import { bootstrap } from '../app.js';
import { CLIENTS } from '../data/clients.js';
import { SIGNATURE_MENU } from '../data/menu.js';
import { TESTIMONIAL_COLUMNS } from '../data/testimonials.js';
import { t } from '../i18n/i18n.js';
import { el, icon } from '../utils/dom.js';
import { openWhatsApp } from '../utils/whatsapp.js';

/** Bar kepercayaan: marquee logo (daftar digandakan agar loop mulus). */
function renderTrust() {
  const track = document.getElementById('trust-track');
  const chips = () => CLIENTS.map((c) => el('div', { class: 'trust-chip' }, icon(c.icon), el('span', { text: c.name })));
  track.replaceChildren(...chips(), ...chips());
}

function signatureCard(item) {
  return el('article', { class: 'signature-card' },
    el('div', { class: 'signature-card__img' },
      el('span', { class: 'signature-card__tag', text: item.tag }),
      el('img', { src: item.img, alt: item.name, loading: 'lazy' })
    ),
    el('h3', { class: 'signature-card__title', text: item.name }),
    el('div', { class: 'signature-card__origin' }, icon('place', 'icon-sm'), el('span', { text: item.origin })),
    el('div', { class: 'signature-card__rating' },
      icon('star', 'icon-sm fill star'), el('span', { class: 'font-mono' }, el('strong', { text: item.rating }), ` (${item.reviews})`)
    ),
    el('div', { class: 'signature-card__bottom' },
      el('span', { class: 'signature-card__price font-mono', text: item.price }),
      el('button', {
        class: 'btn-circle btn-circle--solid',
        type: 'button',
        'aria-label': `${t('home.add')}: ${item.name}`,
        onclick: () => openWhatsApp(`Halo Nusantara Meal Prep, saya ingin memesan ${item.name}.`),
      }, icon('add'))
    )
  );
}

function renderSignature() {
  document.getElementById('signature-track').replaceChildren(...SIGNATURE_MENU.map(signatureCard));
}

function testimonialCard({ name, role, quoteKey }) {
  const stars = Array.from({ length: 5 }, () => icon('star', 'fill'));
  return el('article', { class: 'glass-card' },
    el('div', { class: 'glass-card__user' },
      el('div', { class: 'glass-card__avatar', text: name[0] }),
      el('div', {}, el('div', { class: 'glass-card__name', text: name }), el('div', { class: 'glass-card__role font-mono', text: role }))
    ),
    el('div', { class: 'glass-card__stars', 'aria-label': '5/5' }, stars),
    el('p', { class: 'glass-card__quote', text: `"${t(quoteKey)}"` })
  );
}

/** Testimoni: tiga kolom bergerak vertikal, tiap set digandakan untuk loop tanpa putus. */
function renderTestimonials() {
  const columns = TESTIMONIAL_COLUMNS.map((col, i) =>
    el('div', { class: `testi-column testi-column--${i + 1}` },
      el('div', { class: `testi-track testi-track--${col.direction}-${col.speed}` },
        [...col.items, ...col.items].map(testimonialCard)
      )
    )
  );
  document.getElementById('testi-grid').replaceChildren(...columns);
}

bootstrap(() => {
  renderTrust();
  renderSignature();
  renderTestimonials();
});
