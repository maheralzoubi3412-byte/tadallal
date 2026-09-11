// One deployment serves one market, but both markets share a single Mongo
// database, so currency has to travel with the record rather than be implied
// by which backend answered. Deals have carried a `currency` field all along;
// products now do too, and both render through the same label table.
export const DEFAULT_CURRENCY = 'JOD';

// Arabic name, not the ISO code: "خصم 5 JOD" inside an otherwise Arabic
// sentence reads as a bug, and the single-glyph symbols (﷼ / د.ا) ligature
// badly at text sizes — PlaceResult.priceLevelLabel avoids them for the same
// reason.
const CURRENCY_LABELS: Record<string, string> = {
  JOD: 'دينار',
  SAR: 'ريال',
};

export const CURRENCY_CODES = Object.keys(CURRENCY_LABELS);

// Falls back to the raw code so an unmapped currency degrades to something
// readable instead of vanishing from the price.
export function currencyLabel(code?: string | null): string {
  const resolved = code || DEFAULT_CURRENCY;
  return CURRENCY_LABELS[resolved] ?? resolved;
}
