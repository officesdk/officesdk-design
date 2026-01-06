import baseStyled, {
  ThemedStyledInterface
} from 'styled-components';
import { getGlobalTheme } from './context';
import type { Theme } from '@officesdk/design-theme';

// Helper function to wrap styled component and inject theme via defaultProps
const wrapWithTheme = (component: any) => {
  if (component && typeof component === 'object' ) {
    component.defaultProps = {
      ...component.defaultProps,
      get theme() {
        return getGlobalTheme()
      },
    };
  }
  return component;
};

// Create the main styled function
const styledFunction = (tag: any) => {
  return wrapWithTheme((baseStyled as any)(tag));
};

// Start with a copy of baseStyled to get all its properties
const styledWithBase = Object.assign(styledFunction, baseStyled);

// Override each HTML tag method to inject theme via defaultProps
Object.keys(baseStyled).forEach((key) => {
  const originalMethod = (baseStyled as any)[key];

  if (typeof originalMethod === 'function') {
    (styledWithBase as any)[key] = (...args: any[]) => {
      const component = originalMethod(...args);
      return wrapWithTheme(component);
    };
  }
});

// Export with proper typing
export const styled = styledWithBase as ThemedStyledInterface<Theme>;


