import { describe, it, expect, beforeEach } from 'vitest';
import {
  getNumberLocaleConfig,
  formatNumber,
  formatNumberForEdit,
  parseLocalizedNumber,
  clearLocaleConfigCache,
} from '../numberLocale';

describe('numberLocale utility', () => {
  beforeEach(() => {
    clearLocaleConfigCache();
  });

  describe('getNumberLocaleConfig', () => {
    it('should return correct config for en-US', () => {
      const config = getNumberLocaleConfig('en-US');
      expect(config.decimalSeparator).toBe('.');
      expect(config.thousandsSeparator).toBe(',');
    });

    it('should return correct config for de-DE', () => {
      const config = getNumberLocaleConfig('de-DE');
      expect(config.decimalSeparator).toBe(',');
      expect(config.thousandsSeparator).toBe('.');
    });

    it('should return correct config for fr-FR', () => {
      const config = getNumberLocaleConfig('fr-FR');
      expect(config.decimalSeparator).toBe(',');
      // French uses non-breaking space or narrow no-break space
      expect([' ', '\u00A0', '\u202F']).toContain(config.thousandsSeparator);
    });

    it('should return correct config for zh-CN', () => {
      const config = getNumberLocaleConfig('zh-CN');
      expect(config.decimalSeparator).toBe('.');
      expect(config.thousandsSeparator).toBe(',');
    });

    it('should cache results', () => {
      const config1 = getNumberLocaleConfig('en-US');
      const config2 = getNumberLocaleConfig('en-US');
      expect(config1).toBe(config2);
    });

    it('should fallback for invalid locale', () => {
      const config = getNumberLocaleConfig('invalid-locale-xyz');
      expect(config.decimalSeparator).toBe('.');
      expect(config.thousandsSeparator).toBe(',');
    });
  });

  describe('formatNumber', () => {
    it('should format number with en-US locale', () => {
      expect(formatNumber(1234.56, 'en-US')).toBe('1,234.56');
    });

    it('should format number with de-DE locale', () => {
      expect(formatNumber(1234.56, 'de-DE')).toBe('1.234,56');
    });

    it('should format number with precision', () => {
      expect(formatNumber(1234.5, 'en-US', 2)).toBe('1,234.50');
    });

    it('should format large numbers correctly', () => {
      expect(formatNumber(1234567.89, 'en-US', 2)).toBe('1,234,567.89');
    });

    it('should format integer without decimal places', () => {
      expect(formatNumber(1234, 'en-US')).toBe('1,234');
    });

    it('should handle zero', () => {
      expect(formatNumber(0, 'en-US')).toBe('0');
    });

    it('should handle negative numbers', () => {
      expect(formatNumber(-1234.56, 'en-US')).toBe('-1,234.56');
    });
  });

  describe('formatNumberForEdit', () => {
    it('should format number without thousands separator for en-US', () => {
      expect(formatNumberForEdit(1234.56, 'en-US')).toBe('1234.56');
    });

    it('should format number without thousands separator for de-DE', () => {
      expect(formatNumberForEdit(1234.56, 'de-DE')).toBe('1234,56');
    });

    it('should format with precision', () => {
      expect(formatNumberForEdit(1234.5, 'en-US', 2)).toBe('1234.50');
      expect(formatNumberForEdit(1234.5, 'de-DE', 2)).toBe('1234,50');
    });

    it('should handle integer', () => {
      expect(formatNumberForEdit(1234, 'en-US')).toBe('1234');
    });

    it('should handle negative numbers', () => {
      expect(formatNumberForEdit(-1234.56, 'de-DE')).toBe('-1234,56');
    });
  });

  describe('parseLocalizedNumber', () => {
    describe('en-US format', () => {
      it('should parse number with thousands separator', () => {
        expect(parseLocalizedNumber('1,234.56', 'en-US')).toBe(1234.56);
      });

      it('should parse number without thousands separator', () => {
        expect(parseLocalizedNumber('1234.56', 'en-US')).toBe(1234.56);
      });

      it('should parse integer', () => {
        expect(parseLocalizedNumber('1234', 'en-US')).toBe(1234);
      });

      it('should parse large numbers', () => {
        expect(parseLocalizedNumber('1,234,567.89', 'en-US')).toBe(1234567.89);
      });
    });

    describe('de-DE format', () => {
      it('should parse number with thousands separator', () => {
        expect(parseLocalizedNumber('1.234,56', 'de-DE')).toBe(1234.56);
      });

      it('should parse number without thousands separator', () => {
        expect(parseLocalizedNumber('1234,56', 'de-DE')).toBe(1234.56);
      });

      it('should parse integer', () => {
        expect(parseLocalizedNumber('1234', 'de-DE')).toBe(1234);
      });

      it('should parse large numbers', () => {
        expect(parseLocalizedNumber('1.234.567,89', 'de-DE')).toBe(1234567.89);
      });
    });

    describe('fr-FR format', () => {
      it('should parse number with space as thousands separator', () => {
        expect(parseLocalizedNumber('1 234,56', 'fr-FR')).toBe(1234.56);
      });

      it('should parse number with non-breaking space', () => {
        expect(parseLocalizedNumber('1\u00A0234,56', 'fr-FR')).toBe(1234.56);
      });

      it('should parse number with narrow no-break space', () => {
        expect(parseLocalizedNumber('1\u202F234,56', 'fr-FR')).toBe(1234.56);
      });

      it('should parse number without thousands separator', () => {
        expect(parseLocalizedNumber('1234,56', 'fr-FR')).toBe(1234.56);
      });
    });

    describe('edge cases', () => {
      it('should return null for empty string', () => {
        expect(parseLocalizedNumber('', 'en-US')).toBeNull();
      });

      it('should return null for whitespace only', () => {
        expect(parseLocalizedNumber('   ', 'en-US')).toBeNull();
      });

      it('should return null for invalid input', () => {
        expect(parseLocalizedNumber('abc', 'en-US')).toBeNull();
      });

      it('should parse negative numbers', () => {
        expect(parseLocalizedNumber('-1,234.56', 'en-US')).toBe(-1234.56);
        expect(parseLocalizedNumber('-1.234,56', 'de-DE')).toBe(-1234.56);
      });

      it('should handle leading/trailing whitespace', () => {
        expect(parseLocalizedNumber('  1,234.56  ', 'en-US')).toBe(1234.56);
      });
    });
  });
});
