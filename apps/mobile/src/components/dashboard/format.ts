/**
 * Format a number as IDR currency (no decimals).
 */
export function formatIDR(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format a number as compact IDR (e.g. Rp500K, Rp1.2M).
 */
export function formatIDRCompact(amount: number): string {
  if (amount >= 1_000_000_000) {
    const val = amount / 1_000_000_000
    return `Rp${val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)}B`
  }
  if (amount >= 1_000_000) {
    const val = amount / 1_000_000
    return `Rp${val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)}M`
  }
  if (amount >= 1_000) {
    const val = amount / 1_000
    return `Rp${val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)}K`
  }
  return `Rp${amount}`
}

/**
 * Calculate percent change between two values.
 * Returns a signed number (positive = increase).
 */
export function percentChange(current: number, previous: number): number {
  if (previous === 0) return 0
  return Math.round(((current - previous) / previous) * 100)
}

/**
 * Format a relative time string from a Date.
 * e.g. "2h", "1d", "3d"
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60_000)
  const diffHours = Math.floor(diffMs / 3_600_000)
  const diffDays = Math.floor(diffMs / 86_400_000)

  if (diffMins < 60) return `${diffMins}m`
  if (diffHours < 24) return `${diffHours}h`
  return `${diffDays}d`
}
