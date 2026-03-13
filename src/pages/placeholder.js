// ═══════════════════════════════════════════
// Placeholder Page – For modules under development
// ═══════════════════════════════════════════

import { i18n } from '../i18n.js';

export function renderPlaceholderPage(titleKey, descKey) {
  const page = document.createElement('div');
  page.className = 'page-container';
  page.innerHTML = `
    <div class="page-header animate-fade-in-up">
      <div class="page-header__chapter">${i18n.t('dashboard.chapter')}</div>
      <h1 class="page-header__title">${i18n.t(titleKey || 'placeholder.title')}</h1>
      <p class="page-header__description">${i18n.t(descKey || 'placeholder.description')}</p>
    </div>
    <div class="empty-state animate-fade-in-up" style="animation-delay:0.2s;min-height:400px;">
      <div class="empty-state__icon">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="opacity:0.3;">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
      </div>
      <p class="empty-state__text" style="max-width:400px;margin-top:var(--space-md);">
        ${i18n.t('common.comingSoon')}
      </p>
      <div style="margin-top:var(--space-xl);display:flex;gap:var(--space-md);">
        <span class="badge badge--info">Phase 1</span>
        <span class="badge badge--neutral">In Development</span>
      </div>
    </div>
  `;
  return page;
}
