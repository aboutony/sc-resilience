// ═══════════════════════════════════════════
// Web Worker – Savings Delta Calculator
// Runs off the UI thread to keep the server stream intact
// If the main thread crashes, this computation survives
// ═══════════════════════════════════════════

/**
 * Message protocol:
 * IN:  { type: 'compute-savings', payload: { waterfall, supplierSpend, savingsOpportunities } }
 * OUT: { type: 'savings-result', payload: { totalSavings, savingsByCategory, waterfallDeltas, riskDistribution } }
 */

self.addEventListener('message', (event) => {
  const { type, payload } = event.data;

  if (type === 'compute-savings') {
    try {
      const result = computeSavingsDelta(payload);
      self.postMessage({ type: 'savings-result', payload: result });
    } catch (err) {
      self.postMessage({ type: 'savings-error', payload: { message: err.message } });
    }
  }
});

/**
 * Core savings delta computation.
 * Processes waterfall data, supplier spend distribution, and savings opportunities.
 */
function computeSavingsDelta(data) {
  const { waterfall, supplierSpend, savingsOpportunities } = data;

  // ── Total Savings Aggregation ──
  const totalSavings = savingsOpportunities.reduce((acc, item) => acc + (item.savings || 0), 0);

  // ── Savings by Category ──
  const savingsByCategory = {};
  savingsOpportunities.forEach((item) => {
    const key = item.type || 'uncategorized';
    if (!savingsByCategory[key]) {
      savingsByCategory[key] = { count: 0, total: 0 };
    }
    savingsByCategory[key].count += 1;
    savingsByCategory[key].total += item.savings || 0;
  });

  // ── Waterfall Deltas ──
  // Calculate the change between each stage of the waterfall
  const waterfallDeltas = [];
  for (let i = 1; i < waterfall.length; i++) {
    const prev = waterfall[i - 1];
    const curr = waterfall[i];
    waterfallDeltas.push({
      from: prev.label,
      to: curr.label,
      delta: curr.value - prev.value,
      percentChange: prev.value !== 0
        ? ((curr.value - prev.value) / prev.value * 100).toFixed(2)
        : 0,
    });
  }

  // ── Risk Distribution ──
  // Categorize supplier spend by risk level
  const riskDistribution = { low: 0, medium: 0, high: 0 };
  const totalSpend = supplierSpend.reduce((acc, s) => acc + (s.spend || 0), 0);

  supplierSpend.forEach((s) => {
    const riskLevel = (s.risk || 'medium').toLowerCase();
    if (riskDistribution.hasOwnProperty(riskLevel)) {
      riskDistribution[riskLevel] += s.spend || 0;
    }
  });

  // Convert to percentages
  const riskPcts = {};
  Object.entries(riskDistribution).forEach(([level, amount]) => {
    riskPcts[level] = totalSpend > 0 ? ((amount / totalSpend) * 100).toFixed(1) : 0;
  });

  return {
    totalSavings,
    savingsByCategory,
    waterfallDeltas,
    riskDistribution,
    riskPercentages: riskPcts,
    totalSupplierSpend: totalSpend,
    savingsAsPercentOfSpend: totalSpend > 0
      ? ((totalSavings / totalSpend) * 100).toFixed(2)
      : 0,
  };
}
