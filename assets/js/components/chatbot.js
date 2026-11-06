import { SITE } from '../config/site.js';
import { applyTranslations, t } from '../i18n/i18n.js';
import { el, icon, tr } from '../utils/dom.js';
import { waLink } from '../utils/whatsapp.js';

/** Chatbot "MinTar": tombol melayang + jendela chat. Memanggil POST /api/chat. */
export function initChatbot(container) {
  if (!container) return;
  const history = []; // hanya percakapan nyata, sapaan awal tidak ikut dikirim
  let busy = false;

  const messages = el('div', { class: 'chatbot__messages', role: 'log', 'aria-live': 'polite' },
    el('div', { class: 'chat-msg chat-msg--bot', 'data-i18n': 'chat.greeting' })
  );
  const input = el('input', { class: 'chatbot__input', type: 'text', maxlength: '500', autocomplete: 'off', 'data-i18n-placeholder': 'chat.placeholder', 'aria-label': 'Pesan' });
  const sendBtn = el('button', { class: 'chatbot__send', type: 'submit', 'data-i18n-aria': 'chat.send' }, icon('send'));
  const form = el('form', { class: 'chatbot__form' }, input, sendBtn);

  const closeBtn = el('button', { class: 'chatbot__close', type: 'button', 'data-i18n-aria': 'chat.close', onclick: () => toggle(false) }, icon('close'));
  const panel = el('section', { class: 'chatbot__panel', hidden: true, 'aria-label': SITE.chat.title },
    el('header', { class: 'chatbot__header' }, el('strong', { text: SITE.chat.title }), closeBtn),
    messages,
    form
  );
  const fab = el('button', { class: 'chatbot__fab', type: 'button', 'aria-expanded': 'false', 'data-i18n-aria': 'chat.open', onclick: () => toggle() }, icon('forum'));

  function toggle(force) {
    const open = force ?? panel.hidden;
    panel.hidden = !open;
    fab.setAttribute('aria-expanded', String(open));
    if (open) input.focus();
  }

  const addMessage = (role, content) => {
    const bubble = el('div', { class: `chat-msg chat-msg--${role}`, text: content });
    messages.append(bubble);
    messages.scrollTop = messages.scrollHeight;
    return bubble;
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text || busy) return;
    input.value = '';
    busy = true;
    addMessage('user', text);
    history.push({ role: 'user', content: text });
    const typing = addMessage('bot', t('chat.typing'));
    typing.classList.add('is-typing');

    try {
      const res = await fetch(SITE.chat.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history.slice(-SITE.chat.maxHistory) }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const { reply } = await res.json();
      typing.classList.remove('is-typing');
      typing.textContent = reply;
      history.push({ role: 'assistant', content: reply });
    } catch {
      history.pop(); // buang pesan yang gagal agar riwayat tetap valid
      typing.classList.remove('is-typing');
      typing.textContent = `${t('chat.error')} `;
      typing.append(el('a', { href: waLink(), target: '_blank', rel: 'noopener', text: t('chat.errorLink') }));
    } finally {
      busy = false;
      messages.scrollTop = messages.scrollHeight;
    }
  });

  container.className = 'chatbot';
  container.replaceChildren(panel, fab);
  applyTranslations(container);
}
