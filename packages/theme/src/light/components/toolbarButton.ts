import { ToolbarButtonConfig } from '@officesdk/editor-sdk-core/shared';
import { boxShadow, colors } from '../base';

export const toolbarButton: ToolbarButtonConfig = {
  boxShadow: {
    boxShadow: 'none',
    boxShadowHover: boxShadow.small,
    boxShadowActive: 'none',
    boxShadowClick: boxShadow.small,
    boxShadowDisabled: 'none',
  },
  border: {
    borderColor: 'transparent',
    borderColorHover: colors.palettes.transparency['20'],
    borderColorActive: colors.palettes.transparency['20'],
    borderColorClick: colors.palettes.transparency['30'],
    borderColorDisabled: 'transparent',
  },
  background: {
    background: 'transparent',
    backgroundHover: colors.palettes.transparency['5'],
    backgroundActive: colors.palettes.transparency['5'],
    backgroundClick: colors.palettes.transparency['10'],
    backgroundDisabled: 'transparent',
  },
  color: {
    color: colors.palettes.gray['120'],
    colorHover: colors.palettes.gray['120'],
    colorActive: colors.palettes.gray['120'],
    colorDisabled: colors.palettes.transparency['30'],
  },
  layout: {
    padding: '0 1px',
    height: '28px',
    content: {
      padding: '0 4px',
      gap: '0px',
      iconSize: {
        width: '20px',
        height: '20px',
      },
    },
    dropdown: {
      iconSize: {
        width: '16px',
        height: '16px',
      },
      wrapperWidth: '14px',
    },
  },
  typography: {
    fontSize: '12px',
    fontWeight: 400,
  },
};
