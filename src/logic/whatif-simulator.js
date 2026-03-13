// ═══════════════════════════════════════════
// Logic Module – What-If Simulator Engine
// Extracted from risk-dashboard.js for LSP stability
// CPU-intensive recalculation loop — isolated to prevent HMR cascades
// ═══════════════════════════════════════════

import { formatCompact } from '../currency.js';

/**
 * Initialize the What-If Simulator interactivity.
 * Binds range input listeners and wires up impact meter updates.
 * @param {Object} baseline – whatIfBaseline data from mock-data
 * @param {Array} variables – whatIfVariables array from mock-data
 */
export function initWhatIfSimulator(baseline, variables) {
  const baselineSnapshot = { ...baseline };

  variables.forEach((v) => {
    const range = document.getElementById(`range-${v.id}`);
    const valDisplay = document.getElementById(`val-${v.id}`);
    if (!range) return;

    range.addEventListener('input', () => {
      valDisplay.textContent = range.value;
      const currentVal = parseFloat(range.value);

      // Highlight slider if above threshold
      const sliderEl = range.closest('.whatif-slider');
      if (currentVal >= v.highRiskThreshold) {
        sliderEl.classList.add('whatif-slider--breach');
      } else {
        sliderEl.classList.remove('whatif-slider--breach');
      }

      recalculateImpact(baselineSnapshot, variables);
    });
  });
}

/**
 * Recalculate all impact meters from current slider values.
 * @param {Object} baseline – The frozen baseline snapshot
 * @param {Array} variables – Variable definitions with impactPerUnit
 */
function recalculateImpact(baseline, variables) {
  const results = { ...baseline };
  let highestRiskVar = null;
  let highestFinancialImpact = 0;

  variables.forEach((v) => {
    const range = document.getElementById(`range-${v.id}`);
    const val = parseFloat(range.value);

    let financialImpact = 0;
    Object.entries(v.impactPerUnit).forEach(([metric, impact]) => {
      if (typeof results[metric] === 'number') {
        results[metric] += impact * val;
        financialImpact += Math.abs(impact * val);
      }
    });

    if (financialImpact > highestFinancialImpact) {
      highestFinancialImpact = financialImpact;
      highestRiskVar = v.id;
    }
  });

  // Update meters
  updateMeter('totalRevenue', baseline.totalRevenue, results.totalRevenue, true);
  updateMeter('supplyChainCost', baseline.supplyChainCost, results.supplyChainCost, true, true);
  updateMeter('deliveryOnTime', baseline.deliveryOnTime, results.deliveryOnTime, false);
  updateMeter('supplierScore', baseline.supplierScore, results.supplierScore, false);
  updateMeter('riskExposure', baseline.riskExposure, results.riskExposure, true, true);

  // Highlight highest risk variable
  document.querySelectorAll('.whatif-slider').forEach((el) => {
    el.classList.remove('whatif-slider--highest-risk');
  });
  if (highestRiskVar && highestFinancialImpact > 0) {
    const el = document.querySelector(`[data-var-id="${highestRiskVar}"]`);
    if (el) el.classList.add('whatif-slider--highest-risk');
  }
}

/**
 * Update a single impact meter's display value and color state.
 */
function updateMeter(id, baseline, current, isCurrency, isNegativeWhenUp = false) {
  const meter = document.getElementById(`meter-${id}`);
  if (!meter) return;
  const valEl = meter.querySelector('.whatif-meter__value');
  const diff = current - baseline;

  let displayVal;
  if (isCurrency) {
    displayVal = formatCompact(Math.max(0, current));
  } else {
    displayVal = `${Math.max(0, current).toFixed(1)}${id === 'deliveryOnTime' ? '%' : ''}`;
  }

  const isBreached = isNegativeWhenUp ? diff > 0 : diff < 0;

  valEl.textContent = displayVal;
  valEl.className = 'whatif-meter__value';
  if (Math.abs(diff) < 0.01) {
    valEl.classList.add('whatif-meter__value--stable');
  } else if (isBreached) {
    valEl.classList.add('whatif-meter__value--danger');
  } else {
    valEl.classList.add('whatif-meter__value--safe');
  }
}
