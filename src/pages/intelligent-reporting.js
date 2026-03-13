// ═══════════════════════════════════════════
// Intelligent Reporting – "The Oracle" Chapter 4.4
// NLP Executive Summary, Health Gauge, Key Findings
// ═══════════════════════════════════════════

import { i18n } from '../i18n.js';
import { reportingData, kpiData } from '../data/mock-data.js';

export function renderIntelligentReportingPage() {
  const kpi = kpiData.reporting;
  const page = document.createElement('div');
  page.className = 'page-container animate-convergence';

  const summary = i18n.getLang() === 'ar' ? reportingData.executiveSummary.ar : reportingData.executiveSummary.en;
  const formattedSummary = summary.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');

  page.innerHTML = `
    <div class="page-header animate-fade-in-up">
      <div class="page-header__chapter">${i18n.t('reporting.chapter')}</div>
      <h1 class="page-header__title">${i18n.t('reporting.title')}</h1>
      <p class="page-header__description">${i18n.t('reporting.description')}</p>
    </div>

    <div class="kpi-grid animate-fade-in-up" style="animation-delay:0.1s">
      ${renderKpi('🏛️', kpi.healthScore, 'reporting.kpi.healthScore', 'green')}
      ${renderKpi('💡', kpi.insightsGenerated, 'reporting.kpi.insightsGenerated', 'blue')}
      ${renderKpi('📄', kpi.executiveReports, 'reporting.kpi.executiveReports', 'purple')}
      ${renderKpi('🎯', kpi.actionItems, 'reporting.kpi.actionItems', 'orange')}
    </div>

    <!-- Health Gauge + Key Findings -->
    <div class="grid-2 animate-fade-in-up" style="animation-delay:0.2s;margin-bottom:var(--space-2xl)">
      <!-- Health Score -->
      <div class="card-panel">
        <div class="card-panel__header">
          <div>
            <div class="card-panel__title">${i18n.t('reporting.panels.healthScore')}</div>
            <div class="card-panel__subtitle">${i18n.t('reporting.panels.healthScoreSub')}</div>
          </div>
        </div>
        <div class="card-panel__body" style="display:flex;flex-direction:column;align-items:center;">
          <div class="health-gauge" id="healthGauge">
            <svg viewBox="0 0 200 120" width="200" height="120">
              <path d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke="var(--bg-hover)" stroke-width="16" stroke-linecap="round"/>
              <path d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke="url(#gaugeGrad)" stroke-width="16" stroke-linecap="round" stroke-dasharray="${reportingData.healthScore * 2.51} 251" id="gaugeArc"/>
              <defs><linearGradient id="gaugeGrad"><stop offset="0%" stop-color="var(--accent-danger)"/><stop offset="50%" stop-color="var(--accent-warning)"/><stop offset="100%" stop-color="var(--accent-success)"/></linearGradient></defs>
              <text x="100" y="85" text-anchor="middle" font-family="var(--font-mono)" font-size="32" font-weight="700" fill="var(--text-primary)">${reportingData.healthScore}</text>
              <text x="100" y="105" text-anchor="middle" font-family="Inter" font-size="11" fill="var(--text-tertiary)">/100</text>
            </svg>
          </div>
          <div class="health-breakdown" style="width:100%;margin-top:var(--space-md);">
            ${Object.entries(reportingData.healthBreakdown).map(([key, val]) => `
              <div style="display:flex;align-items:center;gap:var(--space-sm);margin-bottom:var(--space-xs);">
                <span style="font-size:0.75rem;color:var(--text-secondary);min-width:100px;">${i18n.t(`reporting.health.${key}`)}</span>
                <div class="progress-bar" style="flex:1;">
                  <div class="progress-bar__fill progress-bar__fill--${val >= 90 ? 'green' : val >= 80 ? 'blue' : 'orange'}" style="width:${val}%"></div>
                </div>
                <span style="font-family:var(--font-mono);font-size:0.75rem;font-weight:600;color:var(--text-primary);min-width:30px;">${val}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Key Findings -->
      <div class="card-panel">
        <div class="card-panel__header">
          <div>
            <div class="card-panel__title">${i18n.t('reporting.panels.keyFindings')}</div>
            <div class="card-panel__subtitle">${i18n.t('reporting.panels.keyFindingsSub')}</div>
          </div>
        </div>
        <div class="card-panel__body">
          <div class="findings-list">
            ${reportingData.keyFindings.map(f => `
              <div class="finding-item finding-item--${f.severity}">
                <div class="finding-item__indicator"></div>
                <div class="finding-item__content">
                  <div class="finding-item__title">${i18n.getLang() === 'ar' ? f.titleAr : f.title}</div>
                  <div class="finding-item__detail">${i18n.getLang() === 'ar' ? f.detailAr : f.detail}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>

    <!-- NLP Executive Summary -->
    <div class="card-panel nlp-panel animate-fade-in-up" style="animation-delay:0.3s">
      <div class="card-panel__header">
        <div>
          <div class="card-panel__title">${i18n.t('reporting.panels.nlpSummary')}</div>
          <div class="card-panel__subtitle">${i18n.t('reporting.panels.nlpSummarySub')}</div>
        </div>
        <span class="badge badge--info">🤖 ${i18n.t('reporting.panels.aiGenerated')}</span>
      </div>
      <div class="card-panel__body">
        <div class="nlp-summary" id="nlpSummary">
          <div class="nlp-summary__content">${formattedSummary}</div>
        </div>
      </div>
    </div>
  `;

  return page;
}

function renderKpi(icon, data, labelKey, colorClass) {
  const trendIcon = data.trendDir === 'up' ? '↑' : '↓';
  const trendClass = data.trendDir === 'up' ? 'kpi-card__trend--up' : 'kpi-card__trend--down';
  return `<div class="kpi-card"><div class="kpi-card__header"><div class="kpi-card__icon kpi-card__icon--${colorClass}">${icon}</div><div class="kpi-card__trend ${trendClass}">${trendIcon} ${Math.abs(data.trend)}%</div></div><div class="kpi-card__value">${data.value}</div><div class="kpi-card__label">${i18n.t(labelKey)}</div></div>`;
}
