import { bootstrap } from '../app.js';
import { MENU_CATEGORIES, MENU_HERO_CARDS } from '../data/menu.js';
import { t } from '../i18n/i18n.js';
import { el, icon, tr } from '../utils/dom.js';
import { dataTable } from '../utils/table.js';

function heroCard({ img, label, title, color }) {
  return el('div', { class: 'menu-hero__card' },
    el('img', { src: img, alt: title }),
    el('div', { class: 'menu-hero__overlay' },
      el('span', { class: `chip chip--${color}`, text: label }),
      el('div', { class: 'menu-hero__card-title font-display', text: title })
    )
  );
}

function dishCard(item) {
  const fav = el('button', { class: 'dish-card__fav', type: 'button', 'aria-pressed': 'false', 'aria-label': `${t('menu.fav')}: ${item.name}` }, icon('favorite', 'icon-sm'));
  fav.addEventListener('click', () => {
    const on = fav.classList.toggle('is-active');
    fav.setAttribute('aria-pressed', String(on));
  });
  return el('article', { class: 'dish-card' },
    el('div', { class: 'dish-card__photo' },
      item.tag && el('span', { class: `dish-card__tag dish-card__tag--${item.tag.color}`, text: item.tag.text }),
      fav,
      el('img', { src: item.img, alt: item.name, loading: 'lazy' })
    ),
    el('div', { class: 'dish-card__meta' },
      el('div', { class: 'dish-card__title', text: item.name }),
      item.info && el('div', { class: 'dish-card__info font-mono', text: item.info })
    )
  );
}

function navButton(trackId, dir, iconName, labelKey) {
  return el('button', {
    class: 'btn-circle', type: 'button',
    'aria-label': t(labelKey),
    dataset: { carouselTarget: trackId, carouselDir: String(dir) },
  }, icon(iconName));
}

function renderCategories() {
  const blocks = MENU_CATEGORIES.map((cat) =>
    el('div', { class: 'category' },
      el('div', { class: 'category__head' },
        tr(cat.titleKey, 'h3', { class: 'category__title font-display' }),
        el('div', { class: 'category__nav' },
          navButton(cat.id, -1, 'chevron_left', 'menu.prev'),
          navButton(cat.id, 1, 'chevron_right', 'menu.next')
        )
      ),
      el('div', { class: 'carousel', id: cat.id }, cat.items.map(dishCard))
    )
  );
  document.getElementById('menu-categories').replaceChildren(...blocks);
}

/** Tabel gizi menu utama: hanya item yang punya angka ("420 kcal · 28g Protein"). */
function renderNutritionTable() {
  const rows = MENU_CATEGORIES[0].items.flatMap(({ name, info }) => {
    const m = /(\d+)\s*kcal\s*·\s*(\d+)\s*g\s*Protein/i.exec(info || '');
    return m ? [[name, `${m[1]} kcal`, `${m[2]} g`]] : [];
  });
  document.getElementById('nutrition-table').replaceChildren(dataTable({
    caption: t('menu.nutCaption'),
    headers: ['name', 'kcal', 'protein'].map((k) => t(`menu.nut.${k}`)),
    rows,
  }));
}

bootstrap(() => {
  renderNutritionTable();
  document.getElementById('menu-hero-cards').replaceChildren(...MENU_HERO_CARDS.map(heroCard));
  renderCategories();
});
