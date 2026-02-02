import { colors } from '../base';
import { SliderConfig } from '@officesdk/editor-sdk-core/shared';

export const slider: SliderConfig = {
  thumb: {
    background: colors.base.default,
    backgroundHover: colors.base.default,
    backgroundActive: colors.base.default,
    backgroundDisabled: '#F1F1F1',
    // filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.08)) drop-shadow(0 4px 24px rgba(0, 0, 0, 0.12));
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.08), 0 4px 24px rgba(0, 0, 0, 0.12)',
    boxShadowHover: 'none',
    boxShadowActive: 'none',
    boxShadowDisabled: 'none',
    borderColor: '#fff',
    borderColorHover: '#fff',
    borderColorActive: '#fff',
    borderColorDisabled: '#fff',
  },
  track: {
    background: colors.palettes.transparency['20'],
    backgroundDisabled: colors.palettes.transparency['20'],
    filledBackground: colors.palettes.brand,
    filledBackgroundDisabled: colors.palettes.transparency['20'],
    height: '4px',
    width: '100%',
    borderRadius: '2px',
  },
  large: {
    height: '20px',
    thumbSize: '8px',
    thumbOffset: '0',
    borderWidth: '1px',
  },
};

