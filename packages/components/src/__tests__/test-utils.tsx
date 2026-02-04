import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { UIConfigProvider, createUIConfig } from '../UIConfigProvider';
import { lightTheme } from '@officesdk/design/theme';
import type { IconRegistry } from '@officesdk/design/icons';

interface AllTheProvidersProps {
  children: React.ReactNode;
}

// Create a mock icon component factory for testing
// This ensures tests work even when svgr isn't processing SVG files
const createMockIcon = (name: string): React.FC<React.SVGProps<SVGSVGElement>> => {
  const MockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg data-testid={`icon-${name}`} {...props}>
      <rect width="16" height="16" />
    </svg>
  );
  MockIcon.displayName = `MockIcon(${name})`;
  return MockIcon;
};

// Create mock icons for all icons used in tests
const mockIconRegistry: IconRegistry = {
  // Status icons
  success: createMockIcon('success'),
  error: createMockIcon('error'),
  warning: createMockIcon('warning'),
  info: createMockIcon('info'),
  loading: createMockIcon('loading'),
  // General icons
  close: createMockIcon('close'),
  check: createMockIcon('check'),
  search: createMockIcon('search'),
  'chevron-down': createMockIcon('chevron-down'),
  'arrow-down': createMockIcon('arrow-down'),
  'arrow-right': createMockIcon('arrow-right'),
  // Add more as needed
};

const testConfig = createUIConfig({
  theme: lightTheme,
  icons: mockIconRegistry,
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

