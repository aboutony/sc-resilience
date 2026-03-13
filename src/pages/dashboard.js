// ═══════════════════════════════════════════
// Dashboard Page – Sovereign Intelligence Command Center
// Vision 2030 · Realized/Projected · XAI · Urgent Actions
// ═══════════════════════════════════════════

import { i18n } from '../i18n.js';
import { formatSAR, formatCompact } from '../currency.js';
import { kpiData, suppliers } from '../data/mock-data.js';

export function renderDashboardPage() {
  const d = kpiData.dashboard;

  // Savings breakdown
  const realizedSavings = 2870000;
  const projectedSavings = d.costSavings.value - realizedSavings;

  // Route map for pipeline items
  const pipelineRoutes = {
    'nav.marketResearch': 'market-research',
    'nav.supplierSelection': 'supplier-selection',
    'nav.orderManagement': 'order-management',
    'nav.receivingQA': 'receiving-qa',
    'nav.invoicePayment': 'invoice-payment',
    'nav.supplierMgmt': 'supplier-mgmt',
  };

  // KSA suppliers for Vision 2030 panel
  const ksaSuppliers = suppliers.filter(s => s.isKSA);

  // Urgent actions
  const urgentActions = [
    { priority: 'critical', icon: '🚨', title: 'REQ-2026-0412 Pending CPO Approval', titleAr: 'طلب ٠٤١٢ بانتظار اعتماد رئيس المشتريات', detail: 'SAR 15.2M equipment procurement — Finance approved, awaiting final sign-off', detailAr: 'مشتريات معدات ١٥.٢ مليون ر.س — معتمدة مالياً، بانتظار التوقيع', time: '2m', route: 'order-management' },
    { priority: 'warning', icon: '⚓', title: 'Jeddah Port Delay — 3 POs Affected', titleAr: 'تأخير ميناء جدة — ٣ أوامر متأثرة', detail: 'Maersk Line 48h delay impacts PO-0831, PO-0819, PO-0798', detailAr: 'تأخير ميرسك ٤٨ ساعة يؤثر على ٣ أوامر شراء', time: '18m', route: 'receiving-qa' },
    { priority: 'info', icon: '📋', title: 'Invoice Discrepancy — Bahrain Precision', titleAr: 'تباين في الفاتورة — البحرين للتصنيع', detail: 'INV-2026-1798 shows SAR 3.42M vs PO SAR 3.38M — review required', detailAr: 'الفاتورة تظهر ٣.٤٢ مليون مقابل أمر الشراء ٣.٣٨ مليون', time: '45m', route: 'invoice-payment' },
    { priority: 'success', icon: '🏆', title: 'Iktva Certification — Riyadh Polymers', titleAr: 'شهادة اكتفاء — بوليمرات الرياض', detail: 'Level 3 Iktva achieved — Vision 2030 compliance auto-updated', detailAr: 'تم تحقيق اكتفاء المستوى ٣ — تحديث تلقائي لرؤية ٢٠٣٠', time: '1h', route: 'supplier-mgmt' },
  ];

  const page = document.createElement('div');
  page.className = 'page-container';
  page.innerHTML = `
    <div class="page-header animate-fade-in-up">
      <div class="page-header__chapter">${i18n.t('dashboard.chapter')}</div>
      <h1 class="page-header__title">${i18n.t('dashboard.title')}</h1>
      <p class="page-header__description">${i18n.t('dashboard.description')}</p>
    </div>

    <!-- KPI Grid -->
    <div class="kpi-grid">
      <!-- Total Suppliers -->
      <div class="kpi-card animate-fade-in-up" style="animation-delay:0.1s">
        <div class="kpi-card__header">
          <div class="kpi-card__icon kpi-card__icon--blue">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <span class="kpi-card__trend kpi-card__trend--up">↑ ${d.totalSuppliers.trend}%</span>
        </div>
        <div class="kpi-card__value">${d.totalSuppliers.value}</div>
        <div class="kpi-card__label">${i18n.t('dashboard.kpi.totalSuppliers')}</div>
        <!-- XAI Tooltip -->
        <button class="xai-trigger" data-xai="suppliers" title="${i18n.t('dashboard.xaiShowLogic')}">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          ${i18n.t('dashboard.xaiShowLogic')}
        </button>
        <div class="xai-tooltip" id="xai-suppliers" style="display:none;">
          <div class="xai-tooltip__header">${i18n.t('dashboard.xaiDataPoints')}</div>
          <div class="xai-tooltip__item">📊 Global supplier database: 1,284 evaluated</div>
          <div class="xai-tooltip__item">🏭 Active contracts: 84 across 6 regions</div>
          <div class="xai-tooltip__item">📈 YoY growth: +12% from Q1 onboarding</div>
          <div class="xai-tooltip__item">✅ AI confidence: 94.2% (high)</div>
        </div>
      </div>

      <!-- Market Risk Index with Trend Narrative -->
      <div class="kpi-card animate-fade-in-up" style="animation-delay:0.2s">
        <div class="kpi-card__header">
          <div class="kpi-card__icon kpi-card__icon--green">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <span class="kpi-card__trend kpi-card__trend--up">↓ ${Math.abs(d.marketRisk.trend)}%</span>
        </div>
        <div class="kpi-card__value">${d.marketRisk.value}</div>
        <div class="kpi-card__label">${i18n.t('dashboard.kpi.marketRisk')}</div>
        <!-- Trend Narrative -->
        <div style="display:flex;align-items:center;gap:4px;margin-top:var(--space-xs);">
          <span style="color:var(--accent-success);font-size:0.7rem;font-weight:600;">↓ 8.3%</span>
          <span style="font-size:0.65rem;color:var(--text-tertiary);">${i18n.t('dashboard.trendNarrative')}</span>
        </div>
        <!-- XAI -->
        <button class="xai-trigger" data-xai="risk" title="${i18n.t('dashboard.xaiShowLogic')}">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          ${i18n.t('dashboard.xaiShowLogic')}
        </button>
        <div class="xai-tooltip" id="xai-risk" style="display:none;">
          <div class="xai-tooltip__header">${i18n.t('dashboard.xaiDataPoints')}</div>
          <div class="xai-tooltip__item">🌍 Geopolitical exposure: 28% China dependency</div>
          <div class="xai-tooltip__item">📦 Supply disruption probability: 4.2%</div>
          <div class="xai-tooltip__item">💹 Commodity volatility: Steel +5.2%, Oil -1.5%</div>
          <div class="xai-tooltip__item">🛡️ Dual-source coverage: 76% of categories</div>
        </div>
      </div>

      <!-- Cost Savings YTD with Realized/Projected -->
      <div class="kpi-card animate-fade-in-up" style="animation-delay:0.3s">
        <div class="kpi-card__header">
          <div class="kpi-card__icon kpi-card__icon--orange">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <span class="kpi-card__trend kpi-card__trend--up">↑ ${d.costSavings.trend}%</span>
        </div>
        <div class="kpi-card__value financial-amount financial-amount--hero">${formatCompact(d.costSavings.value)}</div>
        <div class="kpi-card__label">${i18n.t('dashboard.kpi.costSavings')}</div>
        <!-- Realized vs Projected -->
        <div class="savings-breakdown" style="display:flex;gap:var(--space-sm);margin-top:var(--space-xs);">
          <div class="savings-chip savings-chip--realized" title="${i18n.t('dashboard.savingsRealizedTip')}">
            <span style="width:6px;height:6px;border-radius:50%;background:var(--accent-success);"></span>
            <span>${i18n.t('dashboard.savingsRealized')}: ${formatCompact(realizedSavings)}</span>
          </div>
          <div class="savings-chip savings-chip--projected" title="${i18n.t('dashboard.savingsProjectedTip')}">
            <span style="width:6px;height:6px;border-radius:50%;background:var(--accent-warning);"></span>
            <span>${i18n.t('dashboard.savingsProjected')}: ${formatCompact(projectedSavings)}</span>
          </div>
        </div>
        <!-- XAI -->
        <button class="xai-trigger" data-xai="savings" title="${i18n.t('dashboard.xaiShowLogic')}">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          ${i18n.t('dashboard.xaiShowLogic')}
        </button>
        <div class="xai-tooltip" id="xai-savings" style="display:none;">
          <div class="xai-tooltip__header">${i18n.t('dashboard.xaiDataPoints')}</div>
          <div class="xai-tooltip__item">🏦 Realized (bank confirmed): ${formatSAR(realizedSavings)}</div>
          <div class="xai-tooltip__item">📋 Projected (pipeline): ${formatSAR(projectedSavings)}</div>
          <div class="xai-tooltip__item">🔄 AI renegotiation wins: SAR 1.2M this quarter</div>
          <div class="xai-tooltip__item">📊 Historical accuracy: 91.4% savings realization</div>
        </div>
      </div>

      <!-- Pending Orders -->
      <div class="kpi-card animate-fade-in-up" style="animation-delay:0.4s">
        <div class="kpi-card__header">
          <div class="kpi-card__icon kpi-card__icon--purple">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
          </div>
          <span class="kpi-card__trend kpi-card__trend--down">↓ ${Math.abs(d.pendingOrders.trend)}%</span>
        </div>
        <div class="kpi-card__value">${d.pendingOrders.value}</div>
        <div class="kpi-card__label">${i18n.t('dashboard.kpi.pendingOrders')}</div>
        <button class="xai-trigger" data-xai="orders" title="${i18n.t('dashboard.xaiShowLogic')}">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          ${i18n.t('dashboard.xaiShowLogic')}
        </button>
        <div class="xai-tooltip" id="xai-orders" style="display:none;">
          <div class="xai-tooltip__header">${i18n.t('dashboard.xaiDataPoints')}</div>
          <div class="xai-tooltip__item">📦 7 awaiting approval, 12 in processing</div>
          <div class="xai-tooltip__item">⏱️ Avg cycle time: 3.2 days (target: 4.0)</div>
          <div class="xai-tooltip__item">🔄 Auto-approved (low-value): 15 this week</div>
          <div class="xai-tooltip__item">📈 Week-over-week: -5% (improving)</div>
        </div>
      </div>
    </div>

    <!-- Main Grid: Left (Pipeline + Vision 2030) | Right (Urgent Actions) -->
    <div class="grid-2-1" style="margin-bottom:var(--space-2xl);">

      <!-- LEFT: Pipeline + Vision 2030 -->
      <div style="display:flex;flex-direction:column;gap:var(--space-2xl);">
        <!-- Source to Pay Pipeline (Clickable) -->
        <div class="card-panel animate-fade-in-up" style="animation-delay:0.5s">
          <div class="card-panel__header">
            <div>
              <div class="card-panel__title">${i18n.t('dashboard.pipeline')}</div>
              <div class="card-panel__subtitle">${i18n.t('dashboard.pipelineSub')}</div>
            </div>
          </div>
          <div class="card-panel__body">
            <div style="display:flex;flex-direction:column;gap:var(--space-md);">
              ${renderPipelineItem(i18n.t('nav.marketResearch'), 95, 'green', 'market-research')}
              ${renderPipelineItem(i18n.t('nav.supplierSelection'), 88, 'blue', 'supplier-selection')}
              ${renderPipelineItem(i18n.t('nav.orderManagement'), 95, 'green', 'order-management')}
              ${renderPipelineItem(i18n.t('nav.receivingQA'), 90, 'green', 'receiving-qa')}
              ${renderPipelineItem(i18n.t('nav.invoicePayment'), 88, 'green', 'invoice-payment')}
              ${renderPipelineItem(i18n.t('nav.supplierMgmt'), 92, 'green', 'supplier-mgmt')}
            </div>
          </div>
        </div>

        <!-- Vision 2030 Local Content Panel -->
        <div class="card-panel animate-fade-in-up" style="animation-delay:0.6s" id="vision2030-panel">
          <div class="card-panel__header">
            <div>
              <div class="card-panel__title" style="display:flex;align-items:center;gap:var(--space-sm);">
                <span style="font-size:1.2rem;">🇸🇦</span>
                ${i18n.t('dashboard.vision2030Toggle')}
              </div>
              <div class="card-panel__subtitle">${i18n.t('dashboard.iktvaScore')} · ${i18n.t('dashboard.sdrpyScore')} · ${i18n.t('dashboard.localContent')}</div>
            </div>
            <div class="card-panel__actions">
              <label class="toggle" style="cursor:pointer;">
                <input type="checkbox" id="vision2030-toggle" checked>
                <span class="toggle__slider"></span>
              </label>
            </div>
          </div>
          <div class="card-panel__body" id="vision2030-content">
            <div class="supplier-grid">
              ${ksaSuppliers.map(s => `
                <div class="supplier-card vision2030-card" style="border-color:#37bc64;position:relative;overflow:hidden;">
                  <div class="vision2030-pulse"></div>
                  <div class="supplier-card__header">
                    <div class="supplier-card__avatar" style="background:#37bc64;animation:vision-pulse 2s infinite;">
                      ${s.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                    </div>
                    <div>
                      <div class="supplier-card__name">${s.name}</div>
                      <div class="supplier-card__region">${s.region} · ${s.category}</div>
                    </div>
                    ${s.isVision2030Certified ? `
                      <div style="margin-inline-start:auto;" title="${i18n.t('dashboard.v2030Certified')}">
                        <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#37bc64,#1a8f42);display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.1rem;box-shadow:0 0 12px rgba(55,188,100,0.4);">🏛️</div>
                      </div>
                    ` : ''}
                  </div>
                  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:var(--space-sm);margin-top:var(--space-md);">
                    <div style="text-align:center;padding:var(--space-xs);background:var(--bg-secondary);border-radius:var(--radius-sm);">
                      <div style="font-size:0.6rem;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.06em;">${i18n.t('dashboard.iktvaScore')}</div>
                      <div style="font-family:var(--font-mono);font-weight:700;font-size:1rem;color:#37bc64;">${s.iktvaScore || '—'}</div>
                    </div>
                    <div style="text-align:center;padding:var(--space-xs);background:var(--bg-secondary);border-radius:var(--radius-sm);">
                      <div style="font-size:0.6rem;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.06em;">${i18n.t('dashboard.sdrpyScore')}</div>
                      <div style="font-family:var(--font-mono);font-weight:700;font-size:1rem;color:#37bc64;">${s.sdrpyScore || '—'}</div>
                    </div>
                    <div style="text-align:center;padding:var(--space-xs);background:var(--bg-secondary);border-radius:var(--radius-sm);">
                      <div style="font-size:0.6rem;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.06em;">${i18n.t('dashboard.localContent')}</div>
                      <div style="font-family:var(--font-mono);font-weight:700;font-size:1rem;color:#37bc64;">${s.localContentPct}%</div>
                    </div>
                  </div>
                  ${s.isVision2030Certified ? `
                    <div style="margin-top:var(--space-sm);padding:4px 8px;background:rgba(55,188,100,0.1);border:1px solid rgba(55,188,100,0.3);border-radius:var(--radius-sm);display:inline-flex;align-items:center;gap:4px;">
                      <span style="font-size:0.65rem;font-weight:600;color:#37bc64;">🏛️ ${i18n.t('dashboard.v2030Certified')}</span>
                    </div>
                  ` : ''}
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT: Urgent Action Feed -->
      <div class="card-panel animate-fade-in-up" style="animation-delay:0.65s;align-self:start;">
        <div class="card-panel__header">
          <div>
            <div class="card-panel__title">${i18n.t('dashboard.urgentActions')}</div>
            <div class="card-panel__subtitle">${i18n.t('dashboard.urgentActionsSub')}</div>
          </div>
        </div>
        <div class="card-panel__body">
          <div style="display:flex;flex-direction:column;gap:var(--space-md);">
            ${urgentActions.map((a, idx) => `
              <div class="urgent-action-item urgent-action-item--${a.priority}" data-route="${a.route}" style="cursor:pointer;animation-delay:${0.7 + idx * 0.08}s;" title="Navigate to ${a.route}">
                <div style="display:flex;align-items:flex-start;gap:var(--space-sm);">
                  <span style="font-size:1.2rem;line-height:1;">${a.icon}</span>
                  <div style="flex:1;min-width:0;">
                    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2px;">
                      <span style="font-size:0.8rem;font-weight:600;color:var(--text-primary);">${i18n.isRTL() ? a.titleAr : a.title}</span>
                      <span style="font-size:0.65rem;color:var(--text-tertiary);white-space:nowrap;margin-inline-start:var(--space-sm);">${a.time}</span>
                    </div>
                    <div style="font-size:0.7rem;color:var(--text-secondary);line-height:1.4;">${i18n.isRTL() ? a.detailAr : a.detail}</div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Navigation Cards -->
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:var(--space-lg);margin-bottom:var(--space-2xl);">
      <div class="card-panel animate-fade-in-up" style="animation-delay:0.7s;cursor:pointer;" id="dash-nav-market-research">
        <div class="card-panel__body" style="padding:var(--space-xl);">
          <div style="display:flex;align-items:center;gap:var(--space-md);margin-bottom:var(--space-md);">
            <div class="kpi-card__icon kpi-card__icon--blue" style="width:48px;height:48px;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            </div>
            <div>
              <h3 style="font-size:1.1rem;font-weight:700;color:var(--text-primary);">${i18n.t('nav.marketResearch')}</h3>
              <p style="font-size:0.8rem;color:var(--text-secondary);">${i18n.t('marketResearch.description')}</p>
            </div>
          </div>
          <div style="display:flex;gap:var(--space-md);">
            <span class="badge badge--info">1,284 ${i18n.t('marketResearch.kpi.suppliersAnalyzed')}</span>
            <span class="badge badge--warning">12 ${i18n.t('marketResearch.kpi.riskAlerts')}</span>
          </div>
        </div>
      </div>

      <div class="card-panel animate-fade-in-up" style="animation-delay:0.8s;cursor:pointer;" id="dash-nav-supplier-selection">
        <div class="card-panel__body" style="padding:var(--space-xl);">
          <div style="display:flex;align-items:center;gap:var(--space-md);margin-bottom:var(--space-md);">
            <div class="kpi-card__icon kpi-card__icon--green" style="width:48px;height:48px;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div>
              <h3 style="font-size:1.1rem;font-weight:700;color:var(--text-primary);">${i18n.t('nav.supplierSelection')}</h3>
              <p style="font-size:0.8rem;color:var(--text-secondary);">${i18n.t('supplierSelection.description')}</p>
            </div>
          </div>
          <div style="display:flex;gap:var(--space-md);">
            <span class="badge badge--success">186 ${i18n.t('supplierSelection.kpi.evaluated')}</span>
            <span class="badge badge--info">92% ESG</span>
          </div>
        </div>
      </div>

      <!-- Chapter 2: Operational Pulse -->
      <div class="card-panel animate-fade-in-up" style="animation-delay:0.9s;cursor:pointer;" id="dash-nav-operational-pulse">
        <div class="card-panel__body" style="padding:var(--space-xl);">
          <div style="display:flex;align-items:center;gap:var(--space-md);margin-bottom:var(--space-md);">
            <div class="kpi-card__icon kpi-card__icon--blue" style="width:48px;height:48px;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
            </div>
            <div>
              <h3 style="font-size:1.1rem;font-weight:700;color:var(--text-primary);">Operational Pulse</h3>
              <p style="font-size:0.8rem;color:var(--text-secondary);">Master-grid for localized zone utilization and Made-in-KSA asset tracking.</p>
            </div>
          </div>
          <div style="display:flex;gap:var(--space-md);">
            <span class="badge badge--info">Warehouse Grid</span>
            <span class="badge badge--success">Operational</span>
          </div>
        </div>
      </div>

      <!-- Chapter 2: Velocity Analytics -->
      <div class="card-panel animate-fade-in-up" style="animation-delay:1.0s;cursor:pointer;" id="dash-nav-velocity-analytics">
        <div class="card-panel__body" style="padding:var(--space-xl);">
          <div style="display:flex;align-items:center;gap:var(--space-md);margin-bottom:var(--space-md);">
            <div class="kpi-card__icon kpi-card__icon--orange" style="width:48px;height:48px;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>
            <div>
              <h3 style="font-size:1.1rem;font-weight:700;color:var(--text-primary);">Velocity Analytics</h3>
              <p style="font-size:0.8rem;color:var(--text-secondary);">Predictive friction detection and throughput stagnation monitoring.</p>
            </div>
          </div>
          <div style="display:flex;gap:var(--space-md);">
            <span class="badge badge--danger">Real-Time</span>
            <span class="badge badge--warning">Friction Alerts</span>
          </div>
        </div>
      </div>
    </div>

    <style>
      .xai-trigger {
        display:inline-flex; align-items:center; gap:3px;
        font-size:0.6rem; color:var(--text-tertiary); background:none; border:1px solid var(--border-secondary);
        border-radius:var(--radius-sm); padding:2px 6px; cursor:pointer; margin-top:var(--space-xs);
        transition:all 300ms ease; text-transform:uppercase; letter-spacing:0.04em; font-weight:500;
      }
      .xai-trigger:hover { color:var(--accent-primary); border-color:var(--accent-primary); background:rgba(26,86,219,0.05); }
      .xai-tooltip {
        position:absolute; left:0; right:0; bottom:100%; margin-bottom:4px; z-index:20;
        background:var(--surface-card); border:1px solid var(--border-primary);
        border-radius:var(--radius-md); padding:var(--space-sm); box-shadow:var(--shadow-lg);
        backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px);
        animation:fadeInUp 0.2s ease;
      }
      .xai-tooltip__header {
        font-size:0.65rem; font-weight:600; color:var(--accent-primary); text-transform:uppercase;
        letter-spacing:0.06em; margin-bottom:var(--space-xs); padding-bottom:var(--space-xs);
        border-bottom:1px solid var(--border-secondary);
      }
      .xai-tooltip__item { font-size:0.7rem; color:var(--text-secondary); padding:2px 0; }
      .kpi-card { position:relative; overflow:visible; }

      .savings-chip {
        display:inline-flex; align-items:center; gap:4px;
        font-size:0.65rem; font-weight:500; padding:2px 8px;
        border-radius:var(--radius-sm); cursor:help;
      }
      .savings-chip--realized { color:var(--accent-success); background:rgba(0,200,83,0.08); }
      .savings-chip--projected { color:var(--accent-warning); background:rgba(245,158,11,0.08); }

      .urgent-action-item {
        padding:var(--space-sm) var(--space-md);
        border-radius:var(--radius-md);
        border-left:3px solid transparent;
        transition:all 300ms ease;
        background:var(--bg-secondary);
      }
      .urgent-action-item:hover { transform:translateX(4px); background:var(--surface-card); }
      .urgent-action-item--critical { border-left-color:var(--accent-danger); }
      .urgent-action-item--warning { border-left-color:var(--accent-warning); }
      .urgent-action-item--info { border-left-color:var(--accent-primary); }
      .urgent-action-item--success { border-left-color:#37bc64; }

      @keyframes vision-pulse {
        0%,100% { box-shadow:0 0 0 0 rgba(55,188,100,0.4); }
        50% { box-shadow:0 0 0 8px rgba(55,188,100,0); }
      }
      .vision2030-card { transition:all 300ms ease; }
      .vision2030-pulse {
        position:absolute; top:0; right:0; width:8px; height:8px; border-radius:50%;
        background:#37bc64; animation:vision-pulse 2s infinite;
      }
      .pipeline-item { cursor:pointer; transition:all 300ms ease; border-radius:var(--radius-sm); padding:var(--space-xs) var(--space-sm); margin:-var(--space-xs) calc(-1 * var(--space-sm)); }
      .pipeline-item:hover { background:var(--bg-secondary); }
    </style>
  `;

  // ── Event Handlers ──

  requestAnimationFrame(() => {
    // Quick nav clicks
    page.querySelector('#dash-nav-market-research')?.addEventListener('click', () => {
      window.location.hash = '#/market-research';
    });
    page.querySelector('#dash-nav-supplier-selection')?.addEventListener('click', () => {
      window.location.hash = '#/supplier-selection';
    });
    page.querySelector('#dash-nav-operational-pulse')?.addEventListener('click', () => {
      window.location.hash = '#/warehouse-grid';
    });
    page.querySelector('#dash-nav-velocity-analytics')?.addEventListener('click', () => {
      window.location.hash = '#/stock-velocity';
    });

    // Pipeline navigation clicks
    page.querySelectorAll('.pipeline-item').forEach(item => {
      item.addEventListener('click', () => {
        const route = item.dataset.route;
        if (route) window.location.hash = '#/' + route;
      });
    });

    // Urgent action clicks → navigate
    page.querySelectorAll('.urgent-action-item').forEach(item => {
      item.addEventListener('click', () => {
        const route = item.dataset.route;
        if (route) window.location.hash = '#/' + route;
      });
    });

    // XAI tooltip toggles
    page.querySelectorAll('.xai-trigger').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const key = trigger.dataset.xai;
        const tooltip = page.querySelector(`#xai-${key}`);
        if (!tooltip) return;

        // Close all other tooltips
        page.querySelectorAll('.xai-tooltip').forEach(t => {
          if (t !== tooltip) t.style.display = 'none';
        });

        tooltip.style.display = tooltip.style.display === 'none' ? 'block' : 'none';
      });
    });

    // Close XAI tooltips when clicking elsewhere
    document.addEventListener('click', () => {
      page.querySelectorAll('.xai-tooltip').forEach(t => t.style.display = 'none');
    });

    // Vision 2030 toggle
    const v2030Toggle = page.querySelector('#vision2030-toggle');
    const v2030Content = page.querySelector('#vision2030-content');
    if (v2030Toggle && v2030Content) {
      v2030Toggle.addEventListener('change', () => {
        v2030Content.style.transition = 'all 300ms ease';
        if (v2030Toggle.checked) {
          v2030Content.style.maxHeight = '1000px';
          v2030Content.style.opacity = '1';
        } else {
          v2030Content.style.maxHeight = '0';
          v2030Content.style.opacity = '0';
          v2030Content.style.overflow = 'hidden';
        }
      });
    }
  });

  return page;
}

function renderPipelineItem(label, progress, color, route) {
  return `
    <div class="pipeline-item" data-route="${route}" style="display:flex;align-items:center;gap:var(--space-md);cursor:pointer;padding:var(--space-xs) var(--space-sm);border-radius:var(--radius-sm);transition:all 300ms ease;" onmouseenter="this.style.background='var(--bg-secondary)'" onmouseleave="this.style.background='transparent'">
      <span style="font-size:0.85rem;font-weight:500;color:var(--text-primary);min-width:180px;">${label}</span>
      <div class="progress-bar" style="flex:1;">
        <div class="progress-bar__fill progress-bar__fill--${color}" style="width:${progress}%"></div>
      </div>
      <span class="financial-amount" style="font-size:0.8rem;min-width:40px;text-align:end;">${progress}%</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" stroke-width="2" style="flex-shrink:0;"><polyline points="9 18 15 12 9 6"/></svg>
    </div>
  `;
}
