// Mirrors the backend's common/constants/currency.ts and the app's
// models/currency.dart. One deployment serves one market, but both markets
// share a single Mongo database, so a price rendered from a record shows that
// record's currency; only form labels, which describe what the vendor is
// about to type, fall back to this deployment's default.
export const DEFAULT_CURRENCY = 'JOD';

const CURRENCY_LABELS = { JOD: 'دينار', SAR: 'ريال' };

// The Arabic name, never the ISO code (reads as a bug mid-sentence) and never
// the single glyph (﷼ / د.ا), which ligatures badly next to digits.
export function currencyLabel(code) {
  const resolved = code || DEFAULT_CURRENCY;
  return CURRENCY_LABELS[resolved] || resolved;
}

// Same wording as the app's PlaceResult.priceLevelLabel. A repeated currency
// glyph ('﷼﷼﷼') is both market-specific and unreadable at these sizes, so the
// level is spelled out instead.
const PRICE_LEVEL_LABELS = ['اقتصادي', 'متوسط', 'مرتفع', 'راقي'];

export function priceLevelLabel(level) {
  if (!level) return '—';
  return PRICE_LEVEL_LABELS[Math.min(Math.max(level, 1), 4) - 1];
}
