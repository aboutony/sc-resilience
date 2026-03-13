// ═══════════════════════════════════════════
// Contract Management – "The Shield of Governance" Chapter 3.1
// CLM, Negotiation, Performance Evaluation
// ═══════════════════════════════════════════

import { i18n } from '../i18n.js';
import { contractData, kpiData, logisticsData } from '../data/mock-data.js';
import { formatSAR, formatCompact } from '../currency.js';

export function renderContractManagementPage() {
  const kpi = kpiData.contractMgmt;
  const page = document.createElement('div');
  page.className = 'page-container';

  page.innerHTML = `
    <div class="page-header animate-fade-in-up">
      <div class="page-header__chapter">${i18n.t('contractMgmt.chapter')}</div>
      <h1 class="page-header__title">${i18n.t('contractMgmt.title')}</h1>
      <p class="page-header__description">${i18n.t('contractMgmt.description')}</p>
    </div>

    <!-- KPI Row -->
    <div class="kpi-grid animate-fade-in-up" style="animation-delay:0.1s">
      ${renderKpi('📄', kpi.activeContracts, 'contractMgmt.kpi.activeContracts', 'blue')}
      ${renderKpi('✓', kpi.avgCompliance, 'contractMgmt.kpi.avgCompliance', 'green')}
      ${renderKpi('⏰', kpi.expiring30d, 'contractMgmt.kpi.expiring30d', 'orange')}
      ${renderKpi('🤖', kpi.aiNegotiationSavings, 'contractMgmt.kpi.aiSavings', 'purple', true)}
    </div>

    <!-- Contract Table + Scope Monitor -->
    <div class="grid-2 animate-fade-in-up" style="animation-delay:0.2s;margin-bottom:var(--space-2xl);">
      <!-- Contract Registry -->
      <div class="card-panel" style="grid-column:1/-1;">
        <div class="card-panel__header">
          <div>
            <div class="card-panel__title">${i18n.t('contractMgmt.panels.registry')}</div>
            <div class="card-panel__subtitle">${i18n.t('contractMgmt.panels.registrySub')}</div>
          </div>
          <span class="badge badge--info">${contractData.contracts.length} ${i18n.t('contractMgmt.panels.contracts')}</span>
        </div>
        <div class="card-panel__body">
          <div class="data-table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>${i18n.t('contractMgmt.table.id')}</th>
                  <th>${i18n.t('contractMgmt.table.supplier')}</th>
                  <th>${i18n.t('contractMgmt.table.type')}</th>
                  <th>${i18n.t('contractMgmt.table.value')}</th>
                  <th>${i18n.t('contractMgmt.table.period')}</th>
                  <th>${i18n.t('contractMgmt.table.compliance')}</th>
                  <th>${i18n.t('contractMgmt.table.status')}</th>
                </tr>
              </thead>
              <tbody>
                ${contractData.contracts.map(c => `
                  <tr>
                    <td><code style="font-family:var(--font-mono);font-size:0.8rem;color:var(--accent-primary);">${c.id}</code></td>
                    <td>${c.supplier}</td>
                    <td><span class="badge badge--neutral">${c.type}</span></td>
                    <td class="col-financial">${formatCompact(c.value)}</td>
                    <td style="font-family:var(--font-mono);font-size:0.75rem;">${c.start} → ${c.end}</td>
                    <td>
                      <div style="display:flex;align-items:center;gap:var(--space-xs);">
                        <div class="progress-bar" style="width:60px;display:inline-block;">
                          <div class="progress-bar__fill progress-bar__fill--${c.compliance >= 95 ? 'green' : c.compliance >= 85 ? 'blue' : 'orange'}" style="width:${c.compliance}%"></div>
                        </div>
                        <span style="font-family:var(--font-mono);font-size:0.75rem;font-weight:600;">${c.compliance}%</span>
                      </div>
                    </td>
                    <td>${renderContractStatus(c.status)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Performance Evaluation (Closed-Loop) + Scope Monitor -->
    <div class="grid-2 animate-fade-in-up" style="animation-delay:0.3s;margin-bottom:var(--space-2xl);">
      <!-- Closed-Loop Performance Evaluation -->
      <div class="card-panel">
        <div class="card-panel__header">
          <div>
            <div class="card-panel__title">${i18n.t('contractMgmt.panels.performance')}</div>
            <div class="card-panel__subtitle">${i18n.t('contractMgmt.panels.performanceSub')}</div>
          </div>
          <span class="badge badge--success">🔗 ${i18n.t('contractMgmt.panels.closedLoop')}</span>
        </div>
        <div class="card-panel__body">
          <div class="perf-eval-list">
            ${contractData.performanceEvals.map(pe => {
              const shipment = logisticsData.inboundShipments.find(s => s.poNumber === pe.poNumber);
              return `
                <div class="perf-eval-card ${pe.onTime ? '' : 'perf-eval-card--breach'}">
                  <div class="perf-eval-card__header">
                    <code style="font-family:var(--font-mono);font-size:0.75rem;color:var(--accent-primary);">${pe.poNumber}</code>
                    <span class="badge ${pe.onTime ? 'badge--success' : 'badge--danger'}">${pe.onTime ? '✓ On Time' : '✗ Late'}</span>
                  </div>
                  <div class="perf-eval-card__metrics">
                    <div class="perf-eval-metric">
                      <span class="perf-eval-metric__label">${i18n.t('contractMgmt.perf.contracted')}</span>
                      <span class="perf-eval-metric__value">${pe.contractedDays}d</span>
                    </div>
                    <div class="perf-eval-metric">
                      <span class="perf-eval-metric__label">${i18n.t('contractMgmt.perf.actual')}</span>
                      <span class="perf-eval-metric__value" style="color:${pe.onTime ? 'var(--accent-success)' : 'var(--accent-danger)'};">${pe.actualDays}d</span>
                    </div>
                    <div class="perf-eval-metric">
                      <span class="perf-eval-metric__label">${i18n.t('contractMgmt.perf.quality')}</span>
                      <span class="perf-eval-metric__value">${pe.qualityScore}/100</span>
                    </div>
                  </div>
                  ${shipment ? `<div style="font-size:0.65rem;color:var(--text-tertiary);margin-top:var(--space-xs);"><span style="opacity:0.6;">→</span> ${shipment.supplier} via ${shipment.carrier}</div>` : ''}
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>

      <!-- Scope Monitor -->
      <div class="card-panel">
        <div class="card-panel__header">
          <div>
            <div class="card-panel__title">${i18n.t('contractMgmt.panels.scope')}</div>
            <div class="card-panel__subtitle">${i18n.t('contractMgmt.panels.scopeSub')}</div>
          </div>
        </div>
        <div class="card-panel__body">
          <div class="ai-feed">
            ${contractData.scopeAlerts.map(alert => `
              <div class="ai-feed__item ai-feed__item--${alert.severity === 'high' ? 'danger' : 'warning'}">
                <div class="ai-feed__icon">${alert.type === 'scope-creep' ? '⚠️' : '🔄'}</div>
                <div class="ai-feed__content">
                  <div class="ai-feed__title">${alert.contract} — ${alert.type === 'scope-creep' ? i18n.t('contractMgmt.scope.creep') : i18n.t('contractMgmt.scope.renewal')}</div>
                  <div class="ai-feed__text">${i18n.getLang() === 'ar' ? alert.descAr : alert.desc}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  return page;
}

// ── KPI Helper ──
function renderKpi(icon, data, labelKey, colorClass, isCurrency = false) {
  const trendIcon = data.trendDir === 'up' ? '↑' : '↓';
  const trendClass = data.trendDir === 'up' ? 'kpi-card__trend--up' : 'kpi-card__trend--down';
  const displayVal = isCurrency ? formatCompact(data.value) : data.value;
  return `
    <div class="kpi-card">
      <div class="kpi-card__header">
        <div class="kpi-card__icon kpi-card__icon--${colorClass}">${icon}</div>
        <div class="kpi-card__trend ${trendClass}">${trendIcon} ${Math.abs(data.trend)}%</div>
      </div>
      <div class="kpi-card__value">${displayVal}</div>
      <div class="kpi-card__label">${i18n.t(labelKey)}</div>
    </div>
  `;
}

// ── Contract Status Badge ──
function renderContractStatus(status) {
  const map = {
    'active': { class: 'badge--success', label: '● Active' },
    'expiring': { class: 'badge--warning', label: '⏰ Expiring' },
    'review': { class: 'badge--info', label: '🔍 Review' },
    'expired': { class: 'badge--danger', label: '✗ Expired' },
  };
  const s = map[status] || map['active'];
  return `<span class="badge ${s.class}">${s.label}</span>`;
}
