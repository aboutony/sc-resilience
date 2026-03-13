// ═══════════════════════════════════════════
// User Profile Page
// ═══════════════════════════════════════════

import { i18n } from '../i18n.js';
import { router } from '../router.js';

export function renderUserProfilePage() {
  const page = document.createElement('div');
  page.className = 'page-container';
  page.innerHTML = `
    <div class="page-header animate-fade-in-up">
      <div class="page-header__chapter">${i18n.t('integrationSettings.chapter')}</div>
      <h1 class="page-header__title">${i18n.t('nav.userProfile')}</h1>
    </div>

    <div class="grid-2" style="align-items:start;">
      <!-- Profile Card -->
      <div class="card-panel animate-fade-in-up" style="animation-delay:0.1s">
        <div class="card-panel__body" style="text-align:center;padding:var(--space-2xl);">
          <div style="width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg, var(--accent-primary), var(--accent-success));display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.5rem;font-weight:800;margin:0 auto var(--space-lg);">FA</div>
          <h3 style="font-size:1.2rem;font-weight:700;color:var(--text-primary);margin-bottom:var(--space-2xs);">Fahad Al-Rashid</h3>
          <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:var(--space-lg);">Chief Procurement Officer</p>
          <div style="display:flex;justify-content:center;gap:var(--space-md);margin-bottom:var(--space-lg);">
            <span class="badge badge--info">Admin</span>
            <span class="badge badge--success">Active</span>
          </div>
          <button class="btn btn--ghost" id="profile-logout" style="width:100%;">
            ${i18n.t('header.logout')}
          </button>
        </div>
      </div>

      <!-- Profile Details -->
      <div class="card-panel animate-fade-in-up" style="animation-delay:0.2s">
        <div class="card-panel__header">
          <div class="card-panel__title">${i18n.t('header.profile')} Details</div>
        </div>
        <div class="card-panel__body">
          <div style="display:flex;flex-direction:column;gap:var(--space-md);">
            <div class="form-group">
              <label class="form-label">Full Name</label>
              <input class="form-input" value="Fahad Al-Rashid" readonly />
            </div>
            <div class="form-group">
              <label class="form-label">${i18n.t('login.email')}</label>
              <input class="form-input" value="fahad@pac-tech.sa" readonly />
            </div>
            <div class="form-group">
              <label class="form-label">Role</label>
              <input class="form-input" value="Chief Procurement Officer" readonly />
            </div>
            <div class="form-group">
              <label class="form-label">Organization</label>
              <input class="form-input" value="PAC Technologies" readonly />
            </div>
            <div class="form-group">
              <label class="form-label">Access Level</label>
              <input class="form-input" value="Full Administrative Access – Phase 1" readonly />
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  page.querySelector('#profile-logout')?.addEventListener('click', () => {
    router.navigate('login');
  });

  return page;
}
