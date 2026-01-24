import { colors } from '../base';

export interface LoadingSizeConfig {
  size: string;
}

export interface LoadingIndicatorConfig {
  /**
   * Type of the default indicator
   * - 'gif': Uses animated GIF image
   * - 'css': Uses CSS animation (rotating spinner)
   */
  defaultType: 'gif' | 'css';
  /**
   * Default indicator image URL (used when type is 'gif')
   */
  defaultImage?: string;
  /**
   * Indicator color (used for CSS animations)
   */
  color: string;
  /**
   * CSS animation configuration
   */
  animation: {
    /**
     * Animation duration
     */
    duration: string;
    /**
     * Animation timing function
     */
    timingFunction: string;
  };
  /**
   * Gap between indicator and tip text
   */
  gap: string;
}

export interface LoadingWrapperConfig {
  overlayBackground: string;
  contentOpacity: number;
}

export interface LoadingFullscreenConfig {
  background: string;
  zIndex: number;
}

export interface LoadingConfig {
  small: LoadingSizeConfig;
  medium: LoadingSizeConfig;
  large: LoadingSizeConfig;
  indicator: LoadingIndicatorConfig;
  tipColor: string;
  wrapper: LoadingWrapperConfig;
  fullscreen: LoadingFullscreenConfig;
}

export const loading: LoadingConfig = {
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

  // Indicator configuration
  indicator: {
    defaultType: 'gif',
    defaultImage: undefined, // Will use built-in GIF if not specified
    color: colors.palettes.brand,
    animation: {
      duration: '1s',
      timingFunction: 'linear',
    },
    gap: '8px',
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
