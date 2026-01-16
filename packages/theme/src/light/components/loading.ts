import { colors } from '../base';

/**
 * Loading component theme configuration
 * Based on Figma design: https://www.figma.com/design/pzDsFwxBseCBUBQrfWo8Cm
 *
 * Sizes:
 * - small: 16x16 (for dropdown menus, search refresh, etc.)
 * - medium: 24x24 (for list/table refresh)
 * - large: 32x32 (for full page refresh)
 */
export const loading = {
  // Size configurations
  small: {
    size: '16px',
  },
  medium: {
    size: '24px',
  },
  large: {
    size: '32px',
  },

  // Tip text color
  tipColor: colors.palettes.gray['100'],

  // Wrapper styles for nested content loading
  wrapper: {
    overlayBackground: colors.palettes.transparency['50'],
    contentOpacity: 0.5,
  },

  // Fullscreen styles
  fullscreen: {
    background: colors.palettes.transparency['50'],
    zIndex: 1000,
  },
};
