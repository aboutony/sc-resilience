// ═══════════════════════════════════════════
// DirectCompareModal – Lazy-Loaded Comparison Modal
// ─── ISOLATED: Imports only direct-compare.js ───
// ─── NOT part of initial page render ───
// ═══════════════════════════════════════════

import { i18n } from '../../i18n.js';
import { compareSuppliers, computeWeightedScore } from '../../logic/direct-compare.js';

let _modalOverlay = null;

/**
 * Open the Direct Compare modal.
 * This module is loaded on-demand via dynamic import().
 * @param {Array} suppliers – Full supplier dataset
 */
export function openDirectCompareModal(suppliers) {
  // If modal already exists, just show it
  if (_modalOverlay && document.body.contains(_modalOverlay)) {
    _modalOverlay.classList.add('modal-visible');
    console.info('[DIRECT-COMPARE] Modal reopened (cached)');
    return;
  }

  const top2 = [...suppliers].sort((a, b) => b.score - a.score).slice(0, 2);
  const comparison = compareSuppliers(top2[0], top2[1]);
  const scoreA = computeWeightedScore(top2[0]);
  const scoreB = computeWeightedScore(top2[1]);

  const dims = ['quality', 'cost', 'delivery', 'reliability', 'esg'];
  const dimLabels = {
    quality: 'Quality',
    cost: 'Cost Efficiency',
    delivery: 'Delivery',
    reliability: 'Reliability',
    esg: 'ESG Score',
  };

  _modalOverlay = document.createElement('div');
  _modalOverlay.className = 'modal-overlay modal-visible';
  _modalOverlay.id = 'direct-compare-modal';
  _modalOverlay.innerHTML = `
    <div class="modal-container" style="max-width:720px;">
      <div class="modal-header">
        <div>
          <h2 class="modal-title" style="display:flex;align-items:center;gap:var(--space-sm);">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 3h5v5"/><path d="M8 3H3v5"/><path d="M21 3l-7 7"/><path d="M3 3l7 7"/><path d="M16 21h5v-5"/><path d="M8 21H3v-5"/><path d="M21 21l-7-7"/><path d="M3 21l7-7"/></svg>
            Direct Compare
          </h2>
          <p style="font-size:0.8rem;color:var(--text-secondary);margin:0;">AI-powered dimension-by-dimension analysis</p>
        </div>
        <button class="btn btn--ghost btn--sm modal-close-btn" id="close-compare-modal">✕</button>
      </div>
      <div class="modal-body" style="padding:var(--space-lg);">
        <!-- Supplier Headers -->
        <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:var(--space-lg);margin-bottom:var(--space-xl);align-items:center;">
          <div style="text-align:center;">
            <div class="supplier-card__avatar" style="background:${top2[0].color};width:48px;height:48px;font-size:1rem;margin:0 auto var(--space-sm);">
              ${top2[0].name.split(' ').map(w => w[0]).slice(0,2).join('')}
            </div>
            <div style="font-weight:700;font-size:0.95rem;color:var(--text-primary);">${top2[0].name}</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);">${top2[0].region}</div>
            <div class="score-circle score-circle--${top2[0].score >= 90 ? 'high' : 'mid'}" style="margin:var(--space-sm) auto 0;width:44px;height:44px;">
              ${top2[0].score}
            </div>
          </div>
          <div style="font-size:1.5rem;font-weight:800;color:var(--text-tertiary);">VS</div>
          <div style="text-align:center;">
            <div class="supplier-card__avatar" style="background:${top2[1].color};width:48px;height:48px;font-size:1rem;margin:0 auto var(--space-sm);">
              ${top2[1].name.split(' ').map(w => w[0]).slice(0,2).join('')}
            </div>
            <div style="font-weight:700;font-size:0.95rem;color:var(--text-primary);">${top2[1].name}</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);">${top2[1].region}</div>
            <div class="score-circle score-circle--${top2[1].score >= 90 ? 'high' : 'mid'}" style="margin:var(--space-sm) auto 0;width:44px;height:44px;">
              ${top2[1].score}
            </div>
          </div>
        </div>

        <!-- Dimension Bars -->
        <div style="display:flex;flex-direction:column;gap:var(--space-md);">
          ${dims.map(dim => {
            const d = comparison.dimensions[dim];
            const aWins = d.advantage === 'a';
            return `
              <div style="border-radius:var(--radius-md);background:var(--bg-card);padding:var(--space-sm) var(--space-md);border:1px solid var(--border-subtle);">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-xs);">
                  <span style="font-size:0.8rem;font-weight:600;color:var(--text-primary);">${dimLabels[dim]}</span>
                  <span class="badge ${aWins ? 'badge--success' : 'badge--info'}" style="font-size:0.65rem;">
                    ${aWins ? top2[0].name.split(' ')[0] : top2[1].name.split(' ')[0]} +${Math.abs(d.delta)}
                  </span>
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-sm);">
                  <div>
                    <div style="height:6px;border-radius:3px;background:var(--bg-tertiary);overflow:hidden;">
                      <div style="height:100%;width:${d.a}%;background:${top2[0].color};border-radius:3px;transition:width 0.6s ease;"></div>
                    </div>
                    <span class="financial-amount" style="font-size:0.7rem;">${d.a}%</span>
                  </div>
                  <div>
                    <div style="height:6px;border-radius:3px;background:var(--bg-tertiary);overflow:hidden;">
                      <div style="height:100%;width:${d.b}%;background:${top2[1].color};border-radius:3px;transition:width 0.6s ease;"></div>
                    </div>
                    <span class="financial-amount" style="font-size:0.7rem;">${d.b}%</span>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Weighted Score Summary -->
        <div style="margin-top:var(--space-xl);padding:var(--space-md);background:var(--bg-tertiary);border-radius:var(--radius-md);display:flex;justify-content:space-around;text-align:center;">
          <div>
            <div style="font-size:0.7rem;color:var(--text-secondary);margin-bottom:2px;">Weighted Score</div>
            <div class="financial-amount" style="font-size:1.1rem;">${scoreA.toFixed(1)}</div>
          </div>
          <div style="font-size:0.75rem;color:var(--text-tertiary);align-self:center;">
            Δ ${Math.abs(scoreA - scoreB).toFixed(1)} pts
          </div>
          <div>
            <div style="font-size:0.7rem;color:var(--text-secondary);margin-bottom:2px;">Weighted Score</div>
            <div class="financial-amount" style="font-size:1.1rem;">${scoreB.toFixed(1)}</div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(_modalOverlay);
  console.info('[DIRECT-COMPARE] Modal loaded and rendered');

  // Close handlers
  const closeBtn = _modalOverlay.querySelector('#close-compare-modal');
  closeBtn.addEventListener('click', () => closeModal());
  _modalOverlay.addEventListener('click', (e) => {
    if (e.target === _modalOverlay) closeModal();
  });

  // ESC key close
  const escHandler = (e) => {
    if (e.key === 'Escape') {
      closeModal();
      window.removeEventListener('keydown', escHandler);
    }
  };
  window.addEventListener('keydown', escHandler);

  function closeModal() {
    _modalOverlay.classList.remove('modal-visible');
    // Remove from DOM after animation
    setTimeout(() => {
      if (_modalOverlay && _modalOverlay.parentNode) {
        _modalOverlay.parentNode.removeChild(_modalOverlay);
        _modalOverlay = null;
      }
    }, 300);
    console.info('[DIRECT-COMPARE] Modal closed');
  }
}
