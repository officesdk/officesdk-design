import { colors } from '../base';
import { TabConfig } from '@officesdk/editor-sdk-core/shared';

export const tab: TabConfig = {
  line: {
    item: {
      background: 'transparent',
      backgroundHover: 'transparent',
      backgroundActive: 'transparent',
      backgroundDisabled: 'transparent',
      borderColor: 'transparent',
      borderColorHover: 'transparent',
      borderColorActive: colors.palettes.brand,
      borderColorDisabled: 'transparent',
      color: colors.palettes.transparency['60'],
      colorHover: colors.palettes.brand,
      colorActive: colors.palettes.brand,
      colorDisabled: colors.palettes.transparency['30'],
    },
    layout: {
      gap: '24px',
    },
  },
  card: {
    item: {
      background: 'transparent',
      backgroundHover: colors.palettes.transparency['5'],
      backgroundActive: colors.palettes.gray['0'],
      backgroundDisabled: 'transparent',
      borderColor: 'transparent',
      borderColorHover: 'transparent',
      borderColorActive: colors.palettes.transparency['20'],
      borderColorDisabled: 'transparent',
      color: colors.palettes.transparency['60'],
      colorHover: colors.palettes.brand,
      colorActive: colors.palettes.brand,
      colorDisabled: colors.palettes.transparency['30'],
    },
    layout: {
      gap: '0',
    },
    backgroundColor: colors.palettes.gray['8'],
  },
  large: {
    height: '32px',
    padding: '10px 16px',
    fontSize: '14px',
    lineHeight: '20px',
    borderRadius: '4px',
    fontWeight: 400,
  },
};

