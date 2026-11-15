import { SITE, instagramUrl } from '../config/site.js';
import { IMAGES } from '../data/images.js';
import { el, icon, tr } from '../utils/dom.js';
import { waLink } from '../utils/whatsapp.js';

const column = (titleKey, items) =>
  el('div', { class: 'footer__col' },
    tr(titleKey, 'h3', { class: 'footer__heading' }),
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
          el('a', { href: '/' }, el('img', { class: 'footer__logo', src: IMAGES.logo, alt: SITE.name, loading: 'lazy' })),
          tr('footer.desc', 'p')
        ),
        column('footer.navTitle', [['nav.home', '/'], ['nav.about', '/about'], ['nav.menu', '/menu'], ['nav.promo', '/promo']]),
        column('footer.supportTitle', [['nav.contact', '/contact'], ['footer.privacy', '/privasi'], ['footer.terms', '/syarat']]),
        el('div', { class: 'footer__col' },
          tr('footer.contactTitle', 'h3', { class: 'footer__heading' }),
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
