// Illustrative sample data used by the interactive demos.

export const stockRows = [
  [24, 22],
  [18, 18],
  [12, 12],
]

export const batchRows = [
  ['LOT-A', '2027-01', 24],
  ['LOT-B', '2027-04', 18],
  ['LOT-C', '2027-08', 12],
]

export const initialReceipts = [24, 24, 22, 24]

// loc 0 = central pharmacy, 1 = north pharmacy.
export const expiryBatches = [
  { lot: 'LOT-A', days: -5, qty: 8, loc: 0 },
  { lot: 'LOT-B', days: 18, qty: 24, loc: 0 },
  { lot: 'LOT-C', days: 26, qty: 12, loc: 1 },
  { lot: 'LOT-D', days: 45, qty: 18, loc: 1 },
  { lot: 'LOT-E', days: 72, qty: 30, loc: 0 },
  { lot: 'LOT-F', days: 150, qty: 36, loc: 1 },
]

// type indexes the dashboard tabs.
export const dashboardRecords = [
  { p: 'A', lot: 'LOT-A', loc: 'central', sys: 24, qty: 22, type: 0 },
  { p: 'B', lot: 'LOT-B', loc: 'north', sys: 18, qty: 16, type: 0 },
  { p: 'C', lot: 'LOT-C', loc: 'central', sys: 12, qty: 12, type: 1 },
  { p: 'D', lot: 'LOT-D', loc: 'north', sys: 30, qty: 30, type: 1 },
  { p: 'E', lot: 'LOT-E', loc: 'central', sys: 8, qty: 8, type: 2 },
  { p: 'F', lot: 'LOT-F', loc: 'north', sys: 16, qty: 16, type: 2 },
  { p: 'G', lot: 'LOT-G', loc: 'central', sys: 36, qty: 32, type: 3 },
  { p: 'H', lot: 'LOT-H', loc: 'north', sys: 12, qty: 14, type: 3 },
]
