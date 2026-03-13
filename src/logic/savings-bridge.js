// ═══════════════════════════════════════════
// Savings Bridge – Promise-based Worker Interface
// Wraps postMessage/onmessage into async calls
// Falls back to synchronous if Worker fails to instantiate
// ═══════════════════════════════════════════

let _worker = null;
let _workerFailed = false;

/**
 * Get or create the savings Web Worker instance.
 * @returns {Worker|null}
 */
function getWorker() {
  if (_workerFailed) return null;
  if (_worker) return _worker;

  try {
    _worker = new Worker(
      new URL('../workers/savings-worker.js', import.meta.url),
      { type: 'module' }
    );
    _worker.onerror = (err) => {
      console.warn('[SAVINGS-BRIDGE] Worker error, falling back to sync:', err.message);
      _workerFailed = true;
      _worker = null;
    };
    console.info('[SAVINGS-BRIDGE] ✓ Web Worker instantiated – UI thread protected');
    return _worker;
  } catch (err) {
    console.warn('[SAVINGS-BRIDGE] Worker instantiation failed, using sync fallback:', err.message);
    _workerFailed = true;
    return null;
  }
}

/**
 * Compute savings delta using the Web Worker.
 * Falls back to inline computation if the Worker is unavailable.
 * @param {Object} data – { waterfall, supplierSpend, savingsOpportunities }
 * @returns {Promise<Object>} Computed savings result
 */
export async function computeSavingsDelta(data) {
  const worker = getWorker();

  if (worker) {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        console.warn('[SAVINGS-BRIDGE] Worker timeout (5s), using sync fallback');
        resolve(computeSavingsDeltaSync(data));
      }, 5000);

      const handler = (event) => {
        clearTimeout(timeout);
        worker.removeEventListener('message', handler);
        if (event.data.type === 'savings-result') {
          resolve(event.data.payload);
        } else if (event.data.type === 'savings-error') {
          console.warn('[SAVINGS-BRIDGE] Worker computation error:', event.data.payload.message);
          resolve(computeSavingsDeltaSync(data));
        }
      };

      worker.addEventListener('message', handler);
      worker.postMessage({ type: 'compute-savings', payload: data });
    });
  }

  // Synchronous fallback
  return computeSavingsDeltaSync(data);
}

/**
 * Synchronous fallback computation (mirrors worker logic).
 */
function computeSavingsDeltaSync(data) {
  const { waterfall, supplierSpend, savingsOpportunities } = data;

  const totalSavings = savingsOpportunities.reduce((acc, item) => acc + (item.savings || 0), 0);

  const savingsByCategory = {};
  savingsOpportunities.forEach((item) => {
    const key = item.type || 'uncategorized';
    if (!savingsByCategory[key]) savingsByCategory[key] = { count: 0, total: 0 };
    savingsByCategory[key].count += 1;
    savingsByCategory[key].total += item.savings || 0;
  });

  const waterfallDeltas = [];
  for (let i = 1; i < waterfall.length; i++) {
    waterfallDeltas.push({
      from: waterfall[i - 1].label,
      to: waterfall[i].label,
      delta: waterfall[i].value - waterfall[i - 1].value,
      percentChange: waterfall[i - 1].value !== 0
        ? ((waterfall[i].value - waterfall[i - 1].value) / waterfall[i - 1].value * 100).toFixed(2) : 0,
    });
  }

  const riskDistribution = { low: 0, medium: 0, high: 0 };
  const totalSpend = supplierSpend.reduce((acc, s) => acc + (s.spend || 0), 0);
  supplierSpend.forEach((s) => {
    const r = (s.risk || 'medium').toLowerCase();
    if (riskDistribution.hasOwnProperty(r)) riskDistribution[r] += s.spend || 0;
  });

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
    savingsAsPercentOfSpend: totalSpend > 0 ? ((totalSavings / totalSpend) * 100).toFixed(2) : 0,
  };
}
