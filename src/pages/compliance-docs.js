// ═══════════════════════════════════════════
// Compliance & Documentation – "The Shield of Governance" Chapter 3.3
// Audit Trail, ESG Screening, Regulatory Feed
// ═══════════════════════════════════════════

import { i18n } from '../i18n.js';
import { complianceData, kpiData } from '../data/mock-data.js';

export function renderComplianceDocsPage() {
  const kpi = kpiData.complianceDocs;
  const page = document.createElement('div');
  page.className = 'page-container';

  page.innerHTML = `
    <div class="page-header animate-fade-in-up">
      <div class="page-header__chapter">${i18n.t('complianceDocs.chapter')}</div>
      <h1 class="page-header__title">${i18n.t('complianceDocs.title')}</h1>
      <p class="page-header__description">${i18n.t('complianceDocs.description')}</p>
    </div>

    <!-- KPI Row -->
    <div class="kpi-grid animate-fade-in-up" style="animation-delay:0.1s">
      ${renderKpi('📋', kpi.regulatoryChecks, 'complianceDocs.kpi.regulatoryChecks', 'blue')}
      ${renderKpi('🌿', kpi.esgScore, 'complianceDocs.kpi.esgScore', 'green')}
      ${renderKpi('🔒', kpi.auditEvents, 'complianceDocs.kpi.auditEvents', 'purple')}
      ${renderKpi('📜', kpi.policyUpdates, 'complianceDocs.kpi.policyUpdates', 'orange')}
    </div>

    <!-- Audit Trail + Regulatory Feed -->
    <div class="grid-2 animate-fade-in-up" style="animation-delay:0.2s;margin-bottom:var(--space-2xl);">
      <!-- Audit Trail — Timestamped Timeline -->
      <div class="card-panel">
        <div class="card-panel__header">
          <div>
            <div class="card-panel__title">${i18n.t('complianceDocs.panels.auditTrail')}</div>
            <div class="card-panel__subtitle">${i18n.t('complianceDocs.panels.auditTrailSub')}</div>
          </div>
          <span class="badge badge--info">🔒 ${i18n.t('complianceDocs.panels.immutable')}</span>
        </div>
        <div class="card-panel__body">
          <div class="audit-timeline">
            ${complianceData.auditTrail.map(entry => `
              <div class="audit-entry">
                <div class="audit-entry__dot audit-entry__dot--${entry.changeType}"></div>
                <div class="audit-entry__content">
                  <div class="audit-entry__header">
                    <span class="audit-entry__action">${entry.action}</span>
                    <span class="audit-entry__version">${entry.version}</span>
                  </div>
                  <div class="audit-entry__meta">
                    <code style="font-family:var(--font-mono);font-size:0.7rem;color:var(--accent-primary);">${entry.contract}</code>
                    <span style="font-size:0.7rem;color:var(--text-tertiary);">by ${entry.author}</span>
                  </div>
                  <div class="audit-entry__footer">
                    <span class="audit-entry__timestamp">${entry.timestamp}</span>
                    <span class="audit-entry__hash" title="SHA-256 integrity hash">#${entry.hash}</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Regulatory Updates Feed -->
      <div class="card-panel">
        <div class="card-panel__header">
          <div>
            <div class="card-panel__title">${i18n.t('complianceDocs.panels.regulatory')}</div>
            <div class="card-panel__subtitle">${i18n.t('complianceDocs.panels.regulatorySub')}</div>
          </div>
        </div>
        <div class="card-panel__body">
          <div class="ai-feed">
            ${complianceData.regulatoryUpdates.map(update => `
              <div class="ai-feed__item ai-feed__item--${update.type}">
                <div class="ai-feed__icon">${update.icon}</div>
                <div class="ai-feed__content">
                  <div class="ai-feed__title">${i18n.getLang() === 'ar' ? update.titleAr : update.title}</div>
                  <div class="ai-feed__text">${i18n.getLang() === 'ar' ? update.textAr : update.text}</div>
                  <div class="ai-feed__time">${i18n.getLang() === 'ar' ? update.timeAr : update.time}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>

    <!-- ESG Screening Table -->
    <div class="card-panel animate-fade-in-up" style="animation-delay:0.3s">
      <div class="card-panel__header">
        <div>
          <div class="card-panel__title">${i18n.t('complianceDocs.panels.esg')}</div>
          <div class="card-panel__subtitle">${i18n.t('complianceDocs.panels.esgSub')}</div>
        </div>
        <span class="badge badge--success">🌿 ${i18n.t('complianceDocs.panels.ethical')}</span>
      </div>
      <div class="card-panel__body">
        <div class="data-table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${i18n.t('complianceDocs.esg.supplier')}</th>
                <th>${i18n.t('complianceDocs.esg.carbon')}</th>
                <th>${i18n.t('complianceDocs.esg.humanRights')}</th>
                <th>${i18n.t('complianceDocs.esg.ethicalSourcing')}</th>
                <th>${i18n.t('complianceDocs.esg.overall')}</th>
                <th>${i18n.t('complianceDocs.esg.trend')}</th>
              </tr>
            </thead>
            <tbody>
              ${complianceData.esgScores.map(s => `
                <tr>
                  <td style="font-weight:600;">${s.supplier}</td>
                  <td>${renderEsgBadge(s.carbon)}</td>
                  <td>${renderEsgBadge(s.humanRights)}</td>
                  <td>${renderEsgBadge(s.ethicalSourcing)}</td>
                  <td><span style="font-family:var(--font-mono);font-weight:700;font-size:1rem;color:${s.overall >= 85 ? 'var(--accent-success)' : s.overall >= 70 ? 'var(--accent-warning)' : 'var(--accent-danger)'};">${s.overall}</span></td>
                  <td>${s.trend === 'up' ? '<span style="color:var(--accent-success);">↑</span>' : s.trend === 'down' ? '<span style="color:var(--accent-danger);">↓</span>' : '<span style="color:var(--text-tertiary);">→</span>'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  return page;
}

// ── KPI Helper ──
function renderKpi(icon, data, labelKey, colorClass) {
  const trendIcon = data.trendDir === 'up' ? '↑' : '↓';
  const trendClass = data.trendDir === 'up' ? 'kpi-card__trend--up' : 'kpi-card__trend--down';
  return `
    <div class="kpi-card">
      <div class="kpi-card__header">
        <div class="kpi-card__icon kpi-card__icon--${colorClass}">${icon}</div>
        <div class="kpi-card__trend ${trendClass}">${trendIcon} ${Math.abs(data.trend)}%</div>
      </div>
      <div class="kpi-card__value">${data.value}</div>
      <div class="kpi-card__label">${i18n.t(labelKey)}</div>
    </div>
  `;
}

// ── ESG Score Badge ──
function renderEsgBadge(score) {
  const color = score >= 85 ? 'var(--accent-success)' : score >= 70 ? 'var(--accent-warning)' : 'var(--accent-danger)';
  return `<span style="font-family:var(--font-mono);font-weight:600;font-size:0.85rem;color:${color};">${score}</span>`;
}
