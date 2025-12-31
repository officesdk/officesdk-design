import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { UIConfigProvider, createUIConfig } from '../UIConfigProvider';
import { lightTheme } from '@officesdk/design-theme';

interface AllTheProvidersProps {
  children: React.ReactNode;
}

const testConfig = createUIConfig({
  theme: lightTheme,
  icons: {},
  toast: {
    defaultDuration: 0, // Disable auto-close in tests
    maxCount: 10,
  },
});

const AllTheProviders = ({ children }: AllTheProvidersProps) => {
  return (
    <UIConfigProvider config={testConfig}>
      {children}
    </UIConfigProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
export { userEvent } from '@testing-library/user-event';

