import { SITE, instagramUrl } from '../config/site.js';
import { IMAGES } from '../data/images.js';
import { el, icon, tr } from '../utils/dom.js';
import { waLink } from '../utils/whatsapp.js';

const column = (titleKey, items) =>
  el('div', { class: 'footer__col' },
    tr(titleKey, 'h4', { class: 'footer__heading' }),
    el('ul', { class: 'footer__links' }, items.map(([key, href]) => el('li', {}, tr(key, 'a', { href }))))
  );

const contactItem = (iconName, child) => el('li', { class: 'footer__contact-item' }, icon(iconName), child);

/** Footer identik di semua halaman, disuntikkan ke #site-footer. */
export function renderFooter(container) {
  if (!container) return;
  container.className = 'footer';
  container.replaceChildren(
    el('div', { class: 'container' },
      el('div', { class: 'footer__grid' },
        el('div', { class: 'footer__brand' },
          el('a', { href: 'index.html' }, el('img', { class: 'footer__logo', src: IMAGES.logo, alt: SITE.name, loading: 'lazy' })),
          tr('footer.desc', 'p')
        ),
        column('footer.navTitle', [['nav.home', 'index.html'], ['nav.about', 'about.html'], ['nav.menu', 'menu.html'], ['nav.promo', 'promo.html']]),
        column('footer.supportTitle', [['nav.contact', 'contact.html'], ['footer.privacy', '#'], ['footer.terms', '#']]),
        el('div', { class: 'footer__col' },
          tr('footer.contactTitle', 'h4', { class: 'footer__heading' }),
          el('ul', { class: 'footer__links' },
            contactItem('mail', el('a', { href: `mailto:${SITE.email}`, text: SITE.email })),
            contactItem('call', el('a', { href: waLink(), target: '_blank', rel: 'noopener', text: SITE.phoneDisplay })),
            contactItem('alternate_email', el('a', { href: instagramUrl(), target: '_blank', rel: 'noopener', text: `@${SITE.instagram}` })),
            contactItem('location_on', el('span', { text: SITE.address }))
          )
        )
      ),
      el('div', { class: 'footer__bottom' }, tr('footer.copy', 'div'), tr('footer.tagline', 'div'))
    )
  );
}
