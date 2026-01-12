import { Theme } from '@officesdk/design/theme';
import type { IconRegistry } from '../Icon/IconProvider';

export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center';

export interface ToastConfig {
  /**
   * Maximum number of toasts to show at once
   */
  maxCount?: number;
  /**
   * Default duration for auto-close (ms)
   */
  defaultDuration?: number;
  /**
   * Toast position on screen
   */
  position?: ToastPosition;
  /**
   * Offset from edge (px)
   */
  offset?: {
    x?: number;
    y?: number;
  };
}

export interface ZIndexConfig {
  /**
   * Z-index for toast notifications
   */
  toast?: number;
  /**
   * Z-index for modals
   */
  modal?: number;
  /**
   * Z-index for dropdowns
   */
  dropdown?: number;
  /**
   * Z-index for tooltips
   */
  tooltip?: number;
}

export interface AnimationConfig {
  /**
   * Default animation duration (ms)
   */
  duration?: number;
  /**
   * Default easing function
   */
  easing?: string;
  /**
   * Disable all animations
   */
  disabled?: boolean;
}

export interface A11yConfig {
  /**
   * Announce messages to screen readers
   */
  announceMessages?: boolean;
  /**
   * Show focus visible indicators
   */
  focusVisible?: boolean;
  /**
   * Reduce motion for users who prefer it
   */
  reduceMotion?: boolean;
}

export interface I18nConfig {
  /**
   * Toast messages
   */
  toast?: {
    closeLabel?: string;
  };
  /**
   * Button messages
   */
  button?: {
    loadingText?: string;
  };
  /**
   * Common messages
   */
  common?: {
    confirm?: string;
    cancel?: string;
    ok?: string;
  };
}

export interface UIConfig {
  /**
   * Theme configuration (required)
   */
  theme: Theme; // Will be typed as Theme from @officesdk/design/theme
  /**
   * Icon registry (optional)
   */
  icons?: IconRegistry;
  /**
   * Toast configuration
   */
  toast?: ToastConfig;
  /**
   * Locale code (e.g., 'zh-CN', 'en-US')
   */
  locale?: string;
  /**
   * Internationalization configuration
   */
  i18n?: I18nConfig;
  /**
   * Z-index layer management
   */
  zIndex?: ZIndexConfig;
  /**
   * Animation configuration
   */
  animation?: AnimationConfig;
  /**
   * Accessibility configuration
   */
  a11y?: A11yConfig;
}

