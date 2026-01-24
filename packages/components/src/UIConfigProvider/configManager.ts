import type React from 'react';
import type { UIConfig } from './types';
import { registerGlobalContext } from '../utils/context';
import ReactDOM from 'react-dom';

let globalConfig: UIConfig | null = null;
let globalIconRegistry: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> | null =
  null;
let globalToastConfig: { maxCount?: number; defaultDuration?: number } | null = null;

/**
 * Create default render function
 * This will be registered via registerGlobalContext and can be retrieved via getGlobalRenderFunction
 */
export const createDefaultRenderFunction = (): ((
  element: React.ReactElement,
  container: HTMLElement
) => void) => {
  return (element: React.ReactElement, container: HTMLElement) => {
    // Try React 18 createRoot first
    if ('createRoot' in ReactDOM) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { createRoot } = ReactDOM as any;
      const root = createRoot(container);
      root.render(element);
    } else {
      // Fallback to React 17 and below
      // eslint-disable-next-line react/no-deprecated
      ReactDOM.render(element, container);
    }
  };
};

/**
 * Initialize UI configuration globally (non-React)
 *
 * This function allows you to configure the UI library without using React Provider components.
 * It's useful for:
 * - Non-React environments
 * - Avoiding Provider nesting (e.g., in Modal components)
 * - Setting up configuration before React app starts
 *
 * After calling this function, all components will automatically use the global configuration.
 * Global styles (Tooltip, Menu, Dropdown) will be injected on-demand when components are first used.
 *
 * @param config - UI configuration object
 * @param config.theme - Theme configuration (required)
 * @param config.icons - Icon registry mapping icon names to React components
 * @param config.toast - Toast configuration (maxCount, defaultDuration, etc.)
 * @param config.locale - Locale code (e.g., 'zh-CN', 'en-US')
 * @param config.i18n - Internationalization configuration
 * @param config.zIndex - Z-index layer management
 * @param config.animation - Animation configuration
 * @param config.a11y - Accessibility configuration
 *
 * @example
 * import { initUIConfig } from '@officesdk/design';
 * import { lightTheme } from '@officesdk/design/theme';
 * import { iconRegistry } from '@officesdk/design/icons';
 *
 * // Initialize before React app starts
 * initUIConfig({
 *   theme: lightTheme,
 *   icons: iconRegistry,
 *   toast: {
 *     maxCount: 5,
 *     defaultDuration: 3000,
 *   },
 * });
 *
 * // Now you can use components without UIConfigProvider
 * function App() {
 *   return <Button>Click me</Button>;
 * }
 *
 * @example
 * // Useful for Modal scenarios - no need to nest Provider
 * function Modal({ children }) {
 *   return (
 *     <Portal>
 *       {children}
 *     </Portal>
 *   );
 * }
 *
 * @example
 * // Can be called multiple times to update config
 * initUIConfig({ theme: lightTheme });
 * // Later update icons
 * initUIConfig({ theme: lightTheme, icons: newIconRegistry });
 */
export const initUIConfig = (config: UIConfig) => {
  globalConfig = config;

  // Create and register render function
  const renderFunction = createDefaultRenderFunction();

  // Register theme and render function via existing mechanism
  registerGlobalContext({
    theme: config.theme,
    render: renderFunction,
  });

  globalIconRegistry = config.icons || null;
  globalToastConfig = {
    maxCount: config.toast?.maxCount ?? 5,
    defaultDuration: config.toast?.defaultDuration ?? 3000,
  };
};

/**
 * Get global UI configuration
 */
export const getUIConfig = (): UIConfig | null => {
  return globalConfig;
};

/**
 * Get global icon registry
 */
export const getGlobalIconRegistry = () => {
  return globalIconRegistry;
};

/**
 * Get global toast config
 */
export const getGlobalToastConfig = () => {
  return globalToastConfig;
};
