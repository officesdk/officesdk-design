import { colors } from '../base';
import { TooltipConfig } from '@officesdk/editor-sdk-core/shared';

export const tooltip: TooltipConfig = {
  arrow: {
    size: { width: '8px', height: '8px' },
    borderRadius: '0',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  black: {
    background: colors.palettes.gray['100'],
    borderColor: 'transparent',
    color: colors.palettes.gray['0'],
    borderRadius: '4px',
    padding: '6px 12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    fontSize: '13px',
    lineHeight: '18px',
    fontWeight: 400,
    maxWidth: '280px',
  },
  white: {
    small: {
      background: colors.palettes.gray['0'],
      borderColor: colors.palettes.transparency['10'],
      color: colors.palettes.brand,
      borderRadius: '4px',
      padding: '4px 8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 400,
    },
    large: {
      background: colors.palettes.gray['0'],
      borderColor: colors.palettes.transparency['10'],
      color: colors.palettes.brand,
      borderRadius: '8px',
      padding: '12px 16px',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 400,
    },
  },
};

