import { currencyLabel, DEFAULT_CURRENCY, CURRENCY_CODES } from './currency';

describe('currencyLabel', () => {
  it('renders the Arabic name, not the ISO code', () => {
    expect(currencyLabel('JOD')).toBe('دينار');
    expect(currencyLabel('SAR')).toBe('ريال');
  });

  // Products written before the currency field existed read back undefined;
  // this deployment serves Jordan, so they are dinars.
  it('treats a missing currency as this deployment default', () => {
    expect(currencyLabel(undefined)).toBe('دينار');
    expect(currencyLabel(null)).toBe('دينار');
    expect(currencyLabel('')).toBe('دينار');
  });

  it('passes an unmapped code through rather than dropping it', () => {
    expect(currencyLabel('EUR')).toBe('EUR');
  });

  it('validates exactly the codes it can label', () => {
    expect(CURRENCY_CODES).toEqual(['JOD', 'SAR']);
    expect(CURRENCY_CODES).toContain(DEFAULT_CURRENCY);
  });
});
