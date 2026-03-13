// ═══════════════════════════════════════════
// Logic Module – Direct Compare Engine
// Supplier comparison scoring & ranking
// Isolated for LSP stability and HMR safety
// ═══════════════════════════════════════════

/**
 * Get the top-N suppliers sorted by overall score.
 * @param {Array} suppliers – Full supplier dataset
 * @param {number} [topN=3] – How many top suppliers to return
 * @returns {Array} Top-N suppliers sorted descending by score
 */
export function getTopSuppliers(suppliers, topN = 3) {
  return [...suppliers].sort((a, b) => b.score - a.score).slice(0, topN);
}

/**
 * Compare two suppliers across all scoring dimensions.
 * Returns a dimension-by-dimension delta analysis.
 * @param {Object} supplierA – First supplier object
 * @param {Object} supplierB – Second supplier object
 * @returns {Object} Comparison result with deltas per dimension
 */
export function compareSuppliers(supplierA, supplierB) {
  const dimensions = ['quality', 'cost', 'delivery', 'reliability', 'esg'];
  const comparison = {
    supplierA: { id: supplierA.id, name: supplierA.name },
    supplierB: { id: supplierB.id, name: supplierB.name },
    overallDelta: supplierA.score - supplierB.score,
    winner: supplierA.score >= supplierB.score ? supplierA.id : supplierB.id,
    dimensions: {},
  };

  dimensions.forEach((dim) => {
    const valA = supplierA[dim] || 0;
    const valB = supplierB[dim] || 0;
    comparison.dimensions[dim] = {
      a: valA,
      b: valB,
      delta: valA - valB,
      advantage: valA >= valB ? 'a' : 'b',
    };
  });

  return comparison;
}

/**
 * Normalize supplier scores to a 0-100 weighted composite.
 * @param {Object} supplier – Supplier object with raw metric values
 * @param {Object} [weights] – Optional weight overrides per dimension
 * @returns {number} Weighted composite score (0-100)
 */
export function computeWeightedScore(supplier, weights = null) {
  const defaultWeights = {
    quality: 0.25,
    cost: 0.20,
    delivery: 0.20,
    reliability: 0.20,
    esg: 0.15,
  };
  const w = weights || defaultWeights;

  return (
    (supplier.quality || 0) * w.quality +
    (supplier.cost || 0) * w.cost +
    (supplier.delivery || 0) * w.delivery +
    (supplier.reliability || 0) * w.reliability +
    (supplier.esg || 0) * w.esg
  );
}
