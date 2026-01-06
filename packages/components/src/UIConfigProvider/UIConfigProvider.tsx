import React, { createContext, useContext } from 'react';
import { IconProvider } from '../Icon/IconProvider';
import { ToastContainer } from '../Toast/ToastContainer';
import type { UIConfig } from './types';
import { TooltipGlobalStyles } from '../Tooltip';
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
  registerGlobalContext({theme: config.theme});
  const { icons = {}, toast = {} } = config;

  const toastConfig = {
    maxCount: toast.maxCount ?? 5,
    defaultDuration: toast.defaultDuration ?? 3000,
  };

  const TooltipStyles = TooltipGlobalStyles as any;

  return (
    <UIConfigContext.Provider value={config}>
      <TooltipStyles />
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
