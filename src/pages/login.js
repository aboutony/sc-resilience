// ═══════════════════════════════════════════
// Login Page
// ═══════════════════════════════════════════

import { i18n } from '../i18n.js';
import { themeEngine } from '../theme.js';
import { router } from '../router.js';

export function renderLoginPage() {
  const page = document.createElement('div');
  page.className = 'login-layout';
  page.id = 'login-page';

  const sunIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
  const moonIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

  page.innerHTML = `
    <div class="login-card animate-scale-in">
      <div style="position:absolute;top:var(--space-md);right:var(--space-md);display:flex;gap:var(--space-xs);">
        <button class="header__control btn--sm" id="login-theme-toggle" title="Toggle Theme">
          ${themeEngine.isDark() ? sunIcon : moonIcon}
        </button>
        <button class="header__control header__lang-btn btn--sm" id="login-lang-toggle">
          ${i18n.getLang() === 'en' ? 'AR' : 'EN'}
        </button>
      </div>
      <div class="login-card__brand">
        <div class="login-card__logo">SC</div>
        <h1 class="login-card__title">${i18n.t('login.title')}</h1>
        <p class="login-card__subtitle">${i18n.t('login.subtitle')}</p>
      </div>
      <form id="login-form">
        <div class="form-group">
          <label class="form-label" for="login-email">${i18n.t('login.email')}</label>
          <input class="form-input" type="email" id="login-email" placeholder="${i18n.t('login.emailPlaceholder')}" value="fahad@pac-tech.sa" />
        </div>
        <div class="form-group">
          <label class="form-label" for="login-password">${i18n.t('login.password')}</label>
          <input class="form-input" type="password" id="login-password" placeholder="${i18n.t('login.passwordPlaceholder')}" value="••••••••" />
        </div>
        <div style="display:flex;justify-content:flex-end;margin-bottom:var(--space-lg);">
          <a href="#" style="font-size:0.8rem;">${i18n.t('login.forgotPassword')}</a>
        </div>
        <button type="submit" class="btn btn--primary" style="width:100%;padding:var(--space-sm);font-size:0.95rem;" id="login-submit">
          ${i18n.t('login.signIn')}
        </button>
      </form>
    </div>
  `;

  // Make position relative for the absolute positioned controls
  const card = page.querySelector('.login-card');
  card.style.position = 'relative';

  // Login form
  page.querySelector('#login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    router.navigate('dashboard');
  });

  // Theme toggle on login
  page.querySelector('#login-theme-toggle').addEventListener('click', () => {
    themeEngine.toggle();
    page.querySelector('#login-theme-toggle').innerHTML = themeEngine.isDark() ? sunIcon : moonIcon;
  });

  // Lang toggle on login
  page.querySelector('#login-lang-toggle').addEventListener('click', () => {
    i18n.toggle();
  });

  return page;
}
