import React, { createContext, useContext } from 'react';

export type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;
export type IconRegistry = Record<string, IconComponent>;

const IconContext = createContext<IconRegistry | null>(null);

export interface IconProviderProps {
  /**
   * Icon registry mapping icon names to React components
   * Import from @officesdk/design/icons
   */
  icons: IconRegistry;
  /**
   * Children components
   */
  children: React.ReactNode;
}

/**
 * IconProvider Component
 *
 * Provides icon registry to child components via Context
 *
 * @example
 * import { IconProvider } from '@officesdk/design';
 * import { iconRegistry } from '@officesdk/design/icons';
 *
 * <IconProvider icons={iconRegistry}>
 *   <App />
 * </IconProvider>
 */
export const IconProvider: React.FC<IconProviderProps> = ({
  icons,
  children,
}) => {
  return (
    <IconContext.Provider value={icons}>
      {children}
    </IconContext.Provider>
  );
};

/**
 * Hook to access icon registry from context
 */
export const useIconRegistry = () => {
  return useContext(IconContext);
};

IconProvider.displayName = 'IconProvider';


