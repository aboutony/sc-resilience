// ═══════════════════════════════════════════
// Currency Formatter – SAR Standard
// ═══════════════════════════════════════════

/**
 * Format a number as SAR currency with monospaced alignment.
 * @param {number} amount
 * @param {boolean} showCurrency - Whether to prefix with "SAR"
 * @returns {string}
 */
export function formatSAR(amount, showCurrency = true) {
  const formatted = new Intl.NumberFormat('en-SA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return showCurrency ? `SAR ${formatted}` : formatted;
}

/**
 * Format a number with K/M/B suffix for compact display.
 * @param {number} amount
 * @returns {string}
 */
export function formatCompact(amount) {
  if (amount >= 1e9) return `SAR ${(amount / 1e9).toFixed(1)}B`;
  if (amount >= 1e6) return `SAR ${(amount / 1e6).toFixed(1)}M`;
  if (amount >= 1e3) return `SAR ${(amount / 1e3).toFixed(1)}K`;
  return `SAR ${amount.toFixed(2)}`;
}

/**
 * Format a percentage.
 * @param {number} value
 * @returns {string}
 */
export function formatPercent(value) {
  return `${value.toFixed(1)}%`;
}
