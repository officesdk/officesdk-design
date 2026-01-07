import React, { createContext, useContext } from 'react';
import ReactDOM from 'react-dom';
import { IconProvider } from '../Icon/IconProvider';
import { ToastContainer } from '../Toast/ToastContainer';
import type { UIConfig } from './types';
import { TooltipGlobalStyles } from '../Tooltip';
import { MenuGlobalStyles, DropdownGlobalStyles } from '../dropdown';
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
 * UIConfigProvider Component
 *
 * Unified provider for all UI components and global configurations
 * Includes ThemeProvider, IconProvider, ToastContainer, and other settings
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
  const { icons = {}, toast = {} } = config;

  // Create a compatible render function
  const renderFunction = (element: React.ReactElement, container: HTMLElement) => {
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

  // Register global context with theme and render function immediately
  // This must happen before any styled components are rendered
  registerGlobalContext({
    theme: config.theme,
    render: renderFunction,
  });

  const toastConfig = {
    maxCount: toast.maxCount ?? 5,
    defaultDuration: toast.defaultDuration ?? 3000,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const TooltipStyles = TooltipGlobalStyles as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MenuStyles = MenuGlobalStyles as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const DropdownStyles = DropdownGlobalStyles as any;

  return (
    <UIConfigContext.Provider value={config}>
      <TooltipStyles />
      <MenuStyles />
      <DropdownStyles />
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
 * @example
 * const config = useUIConfig();
 * console.log(config.theme);
 * console.log(config.locale);
 */
export const useUIConfig = () => {
  const context = useContext(UIConfigContext);
  if (!context) {
    throw new Error('useUIConfig must be used within UIConfigProvider');
  }
  return context;
};

UIConfigProvider.displayName = 'UIConfigProvider';
