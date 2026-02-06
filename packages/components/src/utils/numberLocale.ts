/**
 * Number locale configuration
 */
export interface NumberLocaleConfig {
  /**
   * Decimal separator (e.g., '.' for en-US, ',' for de-DE)
   */
  decimalSeparator: string;
  /**
   * Thousands separator (e.g., ',' for en-US, '.' for de-DE, ' ' for fr-FR)
   */
  thousandsSeparator: string;
}

/**
 * Cache for locale configs to avoid repeated Intl.NumberFormat calls
 */
const localeConfigCache = new Map<string, NumberLocaleConfig>();

/**
 * Get number locale configuration from a locale string
 * Uses Intl.NumberFormat to automatically detect the correct separators
 *
 * @param locale - Locale string (e.g., 'en-US', 'de-DE', 'fr-FR')
 * @returns NumberLocaleConfig with decimal and thousands separators
 *
 * @example
 * getNumberLocaleConfig('en-US') // { decimalSeparator: '.', thousandsSeparator: ',' }
 * getNumberLocaleConfig('de-DE') // { decimalSeparator: ',', thousandsSeparator: '.' }
 * getNumberLocaleConfig('fr-FR') // { decimalSeparator: ',', thousandsSeparator: ' ' }
 */
export const getNumberLocaleConfig = (locale: string): NumberLocaleConfig => {
  // Check cache first
  const cached = localeConfigCache.get(locale);
  if (cached) {
    return cached;
  }

  try {
    const formatter = new Intl.NumberFormat(locale);
    const parts = formatter.formatToParts(1234.5);

    const decimal = parts.find((p) => p.type === 'decimal')?.value ?? '.';
    const group = parts.find((p) => p.type === 'group')?.value ?? ',';

    const config: NumberLocaleConfig = {
      decimalSeparator: decimal,
      thousandsSeparator: group,
    };

    // Cache the result
    localeConfigCache.set(locale, config);

    return config;
  } catch {
    // Fallback to en-US format if locale is invalid
    const fallback: NumberLocaleConfig = {
      decimalSeparator: '.',
      thousandsSeparator: ',',
    };
    return fallback;
  }
};

/**
 * Format a number according to locale with optional precision
 *
 * @param value - The number to format
 * @param locale - Locale string (e.g., 'en-US', 'de-DE')
 * @param precision - Optional number of decimal places
 * @returns Formatted number string with locale-appropriate separators
 *
 * @example
 * formatNumber(1234.56, 'en-US') // '1,234.56'
 * formatNumber(1234.56, 'de-DE') // '1.234,56'
 * formatNumber(1234.56, 'fr-FR') // '1 234,56'
 * formatNumber(1234.5, 'en-US', 2) // '1,234.50'
 */
export const formatNumber = (value: number, locale: string, precision?: number): string => {
  try {
    const options: Intl.NumberFormatOptions = {};

    if (precision !== undefined) {
      options.minimumFractionDigits = precision;
      options.maximumFractionDigits = precision;
    }

    return new Intl.NumberFormat(locale, options).format(value);
  } catch {
    // Fallback to basic formatting if locale is invalid
    if (precision !== undefined) {
      return value.toFixed(precision);
    }
    return String(value);
  }
};

/**
 * Format a number for editing (without thousands separator, using locale decimal separator)
 * This is used when the input is focused to make editing easier
 *
 * @param value - The number to format
 * @param locale - Locale string (e.g., 'en-US', 'de-DE')
 * @param precision - Optional number of decimal places
 * @returns Formatted number string without thousands separator
 *
 * @example
 * formatNumberForEdit(1234.56, 'en-US') // '1234.56'
 * formatNumberForEdit(1234.56, 'de-DE') // '1234,56'
 */
export const formatNumberForEdit = (value: number, locale: string, precision?: number): string => {
  const config = getNumberLocaleConfig(locale);

  let str: string;
  if (precision !== undefined) {
    str = value.toFixed(precision);
  } else {
    str = String(value);
  }

  // Replace standard decimal separator with locale-specific one
  if (config.decimalSeparator !== '.') {
    str = str.replace('.', config.decimalSeparator);
  }

  return str;
};

/**
 * Parse a localized number string to a number
 *
 * @param value - The localized number string to parse
 * @param locale - Locale string (e.g., 'en-US', 'de-DE')
 * @returns Parsed number or null if parsing fails
 *
 * @example
 * parseLocalizedNumber('1,234.56', 'en-US') // 1234.56
 * parseLocalizedNumber('1.234,56', 'de-DE') // 1234.56
 * parseLocalizedNumber('1 234,56', 'fr-FR') // 1234.56
 */
export const parseLocalizedNumber = (value: string, locale: string): number | null => {
  if (!value || value.trim() === '') {
    return null;
  }

  const config = getNumberLocaleConfig(locale);
  let normalized = value.trim();

  // Handle the case where thousands and decimal separators might conflict
  // We need to be careful about the order of replacements

  if (config.thousandsSeparator === '.' && config.decimalSeparator === ',') {
    // German-style: 1.234,56
    // First remove thousands separators (dots)
    normalized = normalized.replace(/\./g, '');
    // Then replace decimal separator (comma) with dot
    normalized = normalized.replace(',', '.');
  } else if (config.decimalSeparator === ',') {
    // French-style or similar: 1 234,56 (handles space, non-breaking space, narrow no-break space)
    // Remove all types of spaces used as thousands separators
    normalized = normalized.replace(/[\s\u00A0\u202F]/g, '');
    // Replace comma decimal separator with dot
    normalized = normalized.replace(',', '.');
  } else if (config.thousandsSeparator === ',' && config.decimalSeparator === '.') {
    // English-style: 1,234.56
    normalized = normalized.replace(/,/g, '');
  } else {
    // Generic fallback: remove thousands separator, replace decimal separator
    if (config.thousandsSeparator) {
      const escapedThousands = config.thousandsSeparator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      normalized = normalized.replace(new RegExp(escapedThousands, 'g'), '');
    }
    if (config.decimalSeparator !== '.') {
      normalized = normalized.replace(config.decimalSeparator, '.');
    }
  }

  const parsed = parseFloat(normalized);
  return isNaN(parsed) ? null : parsed;
};

/**
 * Clear the locale config cache (useful for testing)
 */
export const clearLocaleConfigCache = (): void => {
  localeConfigCache.clear();
};
