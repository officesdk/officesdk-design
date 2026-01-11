import React, { createContext, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { IconProvider } from '../Icon/IconProvider';
import { ToastContainer } from '../Toast/ToastContainer';
import type { UIConfig } from './types';
import { initUIConfig, getUIConfig } from './configManager';
import { registerGlobalContext } from '../utils/context';

const UIConfigContext = createContext<UIConfig | null>(null);

export interface UIConfigProviderProps {
  /**
   * UI configuration
   */
  config: UIConfig;
  /**
   * Children components
   */
  children: React.ReactNode;
}

/**
 * UIConfigProvider Component (Optional, for React convenience)
 *
 * Unified provider for all UI components and global configurations.
 * Includes IconProvider, ToastContainer, and other settings.
 *
 * Note: Global styles (Tooltip, Menu, Dropdown) are now injected on-demand
 * when components are first used, so they are no longer included here.
 *
 * For non-React environments or when you want to avoid Provider nesting,
 * use initUIConfig() instead.
 *
 * @example
 * import { UIConfigProvider } from '@officesdk/design';
 * import { lightTheme } from '@officesdk/design/theme';
 * import { iconRegistry } from '@officesdk/design/icons';
 *
 * <UIConfigProvider config={{
 *   theme: lightTheme,
 *   icons: iconRegistry,
 *   toast: {
 *     defaultDuration: 3000,
 *     maxCount: 5,
 *   },
 * }}>
 *   <App />
 * </UIConfigProvider>
 */
export const UIConfigProvider: React.FC<UIConfigProviderProps> = ({ config, children }) => {
  // Initialize global config on mount
  useEffect(() => {
    // Create render function compatible with React 18 and below
    const renderFunction = (element: React.ReactElement, container: HTMLElement) => {
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

    // Register render function first
    registerGlobalContext({
      theme: config.theme,
      render: renderFunction,
    });

    // Then initialize full config
    initUIConfig(config);
  }, [config]);

  const { icons = {} } = config;
  const toastConfig = {
    maxCount: config.toast?.maxCount ?? 5,
    defaultDuration: config.toast?.defaultDuration ?? 3000,
  };

  return (
    <UIConfigContext.Provider value={config}>
      <IconProvider icons={icons}>
        <ToastContainer
          maxCount={toastConfig.maxCount}
          defaultDuration={toastConfig.defaultDuration}
        >
          {children}
        </ToastContainer>
      </IconProvider>
    </UIConfigContext.Provider>
  );
};

/**
 * Hook to access UI configuration
 *
 * Falls back to global config if context is not available.
 * This allows components to work even without UIConfigProvider when initUIConfig() is used.
 *
 * @example
 * const config = useUIConfig();
 * console.log(config?.theme);
 * console.log(config?.locale);
 */
export const useUIConfig = () => {
  const context = useContext(UIConfigContext);
  // Fallback to global config if context is not available
  return context || getUIConfig();
};

UIConfigProvider.displayName = 'UIConfigProvider';
