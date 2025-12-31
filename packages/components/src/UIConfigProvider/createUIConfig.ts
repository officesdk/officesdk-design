import type { UIConfig } from './types';

/**
 * Create UI configuration with default values
 *
 * @example
 * import { createUIConfig } from '@officesdk/design';
 * import { lightTheme } from '@officesdk/design/theme';
 * import { iconRegistry } from '@officesdk/design/icons';
 *
 * const config = createUIConfig({
 *   theme: lightTheme,
 *   icons: iconRegistry,
 *   toast: {
 *     defaultDuration: 3000,
 *   },
 * });
 */
export const createUIConfig = (config: UIConfig): UIConfig => {
  return {
    // Theme is required
    theme: config.theme,

    // Icons with default
    icons: config.icons ?? {},

    // Toast with defaults
    toast: {
      maxCount: config.toast?.maxCount ?? 5,
      defaultDuration: config.toast?.defaultDuration ?? 3000,
      position: config.toast?.position ?? 'top-right',
      offset: {
        x: config.toast?.offset?.x ?? 24,
        y: config.toast?.offset?.y ?? 24,
      },
    },

    // Locale with default
    locale: config.locale ?? 'en-US',

    // I18n with defaults
    i18n: {
      toast: {
        closeLabel: config.i18n?.toast?.closeLabel ?? 'Close',
      },
      button: {
        loadingText: config.i18n?.button?.loadingText ?? 'Loading...',
      },
      common: {
        confirm: config.i18n?.common?.confirm ?? 'Confirm',
        cancel: config.i18n?.common?.cancel ?? 'Cancel',
        ok: config.i18n?.common?.ok ?? 'OK',
      },
    },

    // Z-index with defaults
    zIndex: {
      toast: config.zIndex?.toast ?? 9999,
      modal: config.zIndex?.modal ?? 10000,
      dropdown: config.zIndex?.dropdown ?? 1000,
      tooltip: config.zIndex?.tooltip ?? 1001,
    },

    // Animation with defaults
    animation: {
      duration: config.animation?.duration ?? 200,
      easing: config.animation?.easing ?? 'cubic-bezier(0.4, 0, 0.2, 1)',
      disabled: config.animation?.disabled ?? false,
    },

    // A11y with defaults
    a11y: {
      announceMessages: config.a11y?.announceMessages ?? true,
      focusVisible: config.a11y?.focusVisible ?? true,
      reduceMotion: config.a11y?.reduceMotion ?? false,
    },
  };
};

/**
 * Merge multiple configs (useful for extending base configs)
 */
export const mergeUIConfig = (baseConfig: UIConfig, ...configs: Partial<UIConfig>[]): UIConfig => {
  const merged = configs.reduce((acc, config) => ({
    ...acc,
    ...config,
    toast: { ...acc.toast, ...config.toast },
    i18n: { ...acc.i18n, ...config.i18n },
    zIndex: { ...acc.zIndex, ...config.zIndex },
    animation: { ...acc.animation, ...config.animation },
    a11y: { ...acc.a11y, ...config.a11y },
  }), baseConfig);

  return merged as UIConfig;
};

