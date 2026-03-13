// ═══════════════════════════════════════════════════════
// ApprovalWorkflow – Smart Approval + Vision 2030 (Ch 1.3)
// Extracted from monolithic order-management.js
// ═══════════════════════════════════════════════════════

import { i18n } from '../../i18n.js';
import { formatSAR } from '../../currency.js';

// ─── Vision 2030 Theme Constants ───
const SAUDI_GREEN = '#00B140';
const SAUDI_GREEN_GLOW = 'rgba(0, 177, 64, 0.25)';
const SAUDI_GREEN_FAINT = 'rgba(0, 177, 64, 0.08)';

// ─── Progress Calculator ───
function getApprovalProgress(steps) {
  const completedCount = steps.filter(s => s.status === 'completed').length;
  const currentIdx = steps.findIndex(s => s.status === 'current');
  if (currentIdx >= 0) return ((currentIdx) / (steps.length - 1)) * 100;
  return (completedCount / (steps.length - 1)) * 100;
}

// ─── Vision 2030 Compliance Score ───
function getVision2030Score(approval) {
  // Compliance score derived from workflow completeness:
  //   • Each completed step = 25% base
  //   • Bonus for on-time completion
  const completedCount = approval.steps.filter(s => s.status === 'completed').length;
  const totalSteps = approval.steps.length;
  const baseScore = Math.round((completedCount / totalSteps) * 85);
  const timeBonus = completedCount > 0 ? 7 : 0;
  return Math.min(baseScore + timeBonus + 5, 100); // floor at 5% for initiated workflows
}

function renderVision2030Badge(score) {
  const tier = score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Progressing' : 'Initiated';
  const tierAr = score >= 80 ? 'ممتاز' : score >= 60 ? 'جيد' : score >= 40 ? 'قيد التقدم' : 'مُبادَر';
  const tierColor = score >= 80 ? SAUDI_GREEN : score >= 60 ? '#4CAF50' : score >= 40 ? '#FF9800' : '#9E9E9E';

  return `
    <div class="vision2030-badge" style="
      display:inline-flex;align-items:center;gap:8px;
      padding:6px 14px;border-radius:20px;
      background:${SAUDI_GREEN_FAINT};
      border:1.5px solid ${tierColor};
      font-size:0.72rem;font-weight:700;
      color:${tierColor};letter-spacing:0.04em;
      animation: vision2030Pulse 2.5s ease-in-out infinite;
    ">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${tierColor}" stroke-width="2.5">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
      </svg>
      <span>V2030</span>
      <span style="
        background:${tierColor};color:#fff;
        padding:2px 8px;border-radius:10px;
        font-size:0.65rem;font-weight:800;
      ">${score}%</span>
      <span style="opacity:0.8;">${i18n.isRTL() ? tierAr : tier}</span>
    </div>
  `;
}

/**
 * Renders the Smart Approval Workflow panel with Vision 2030 Compliance badge.
 * @param {Object} approval – smartApproval object from mock-data
 * @returns {HTMLElement}
 */
export function renderApprovalWorkflow(approval) {
  const panel = document.createElement('div');
  panel.className = 'card-panel animate-fade-in-up';
  panel.style.cssText = 'animation-delay:0.4s;';

  const v2030Score = getVision2030Score(approval);

  panel.innerHTML = `
    <div class="card-panel__header">
      <div>
        <div class="card-panel__title">${i18n.t('orderManagement.panels.approvalWorkflow')}</div>
        <div class="card-panel__subtitle">${i18n.t('orderManagement.panels.approvalWorkflowSub')}</div>
      </div>
      <div class="card-panel__actions" style="display:flex;align-items:center;gap:var(--space-sm);">
        ${renderVision2030Badge(v2030Score)}
        <span class="badge badge--warning" style="font-size:0.75rem;">${i18n.isRTL() ? approval.titleAr : approval.title}</span>
      </div>
    </div>
    <div class="card-panel__body">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-xl);padding:var(--space-md);background:var(--bg-secondary);border-radius:var(--radius-md);">
        <div>
          <span style="font-size:0.75rem;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.06em;">${i18n.t('orderManagement.approval.requisition')}</span>
          <div style="font-family:var(--font-mono);font-weight:700;color:var(--accent-primary);font-size:1rem;">${approval.requisitionId}</div>
        </div>
        <div style="text-align:end;">
          <span style="font-size:0.75rem;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.06em;">${i18n.t('orderManagement.kpi.totalPOValue')}</span>
          <div class="financial-amount financial-amount--large" style="font-size:1.1rem;font-weight:800;">${formatSAR(approval.totalValue)}</div>
        </div>
      </div>

      <div class="approval-workflow" style="display:flex;align-items:flex-start;justify-content:space-between;position:relative;padding:var(--space-lg) 0;">
        <!-- Connecting line -->
        <div style="position:absolute;top:28px;left:40px;right:40px;height:3px;background:var(--border-primary);z-index:0;"></div>
        <div style="position:absolute;top:28px;left:40px;height:3px;background:${SAUDI_GREEN};z-index:1;width:${getApprovalProgress(approval.steps)}%;transition:width 1s ease;box-shadow:0 0 8px ${SAUDI_GREEN_GLOW};"></div>

        ${approval.steps.map((step, idx) => `
          <div style="display:flex;flex-direction:column;align-items:center;z-index:2;flex:1;max-width:160px;" class="animate-fade-in-up">
            <div style="
              width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;
              font-weight:700;font-size:0.9rem;border:3px solid;margin-bottom:var(--space-sm);
              transition:all 300ms ease;
              ${step.status === 'completed' ? `background:${SAUDI_GREEN};border-color:${SAUDI_GREEN};color:#fff;box-shadow:0 0 12px ${SAUDI_GREEN_GLOW};` :
                step.status === 'current' ? `background:var(--surface-card);border-color:var(--accent-primary);color:var(--accent-primary);box-shadow:0 0 0 6px rgba(26,86,219,0.15);animation:pulse-ring 2s infinite;` :
                'background:var(--bg-secondary);border-color:var(--border-primary);color:var(--text-tertiary);'}
            ">
              ${step.status === 'completed' ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>' : step.initials}
            </div>
            <div style="text-align:center;">
              <div style="font-size:0.8rem;font-weight:600;color:var(--text-primary);margin-bottom:2px;">${i18n.isRTL() ? step.roleAr : step.role}</div>
              <div style="font-size:0.7rem;color:var(--text-secondary);">${step.name}</div>
              <div style="font-size:0.65rem;color:var(--text-tertiary);margin-top:4px;">
                ${step.status === 'completed' ? `<span class="badge badge--success" style="font-size:0.6rem;">${i18n.t('orderManagement.approval.completed')}</span>` :
                  step.status === 'current' ? `<span class="badge badge--info" style="font-size:0.6rem;animation:pulse-ring 2s infinite;">${i18n.t('orderManagement.approval.current')}</span>` :
                  `<span class="badge badge--neutral" style="font-size:0.6rem;">${i18n.t('orderManagement.approval.pending')}</span>`}
              </div>
              ${step.timestamp ? `<div style="font-size:0.6rem;color:var(--text-tertiary);margin-top:2px;font-family:var(--font-mono);">${step.timestamp}</div>` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <style>
      @keyframes pulse-ring {
        0% { box-shadow: 0 0 0 4px rgba(26,86,219,0.15); }
        50% { box-shadow: 0 0 0 10px rgba(26,86,219,0.05); }
        100% { box-shadow: 0 0 0 4px rgba(26,86,219,0.15); }
      }
      @keyframes vision2030Pulse {
        0%, 100% { box-shadow: 0 0 0 0 ${SAUDI_GREEN_GLOW}; }
        50% { box-shadow: 0 0 0 6px transparent; }
      }
    </style>
  `;

  return panel;
}
