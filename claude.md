# Officesdk Design - AI Assistant Guide

This document provides comprehensive guidance for AI assistants working on the Officesdk Design project.

## Project Overview

Officesdk Design is a modern UI component library built with React 18 and TypeScript. It's designed as a monorepo containing multiple packages for components, themes, icons, and utilities.

### Key Information

- **Tech Stack**: React 18, TypeScript, styled-components, Storybook, Vitest
- **Architecture**: Monorepo with Yarn Workspaces
- **Package Manager**: Yarn 4.9.1+
- **Node Version**: 20.0.0+
- **Test Framework**: Vitest
- **Documentation**: Storybook

## Project Structure

```
officesdk-design/
├── packages/
│   ├── components/         # Core UI components (@officesdk/design-components)
│   ├── theme/             # Theme system (@officesdk/design-theme)
│   ├── icons/             # Icon components (@officesdk/design-icons)
│   ├── utils/             # Utility functions (@officesdk/design-utils)
│   └── design/            # Main package that exports all above (@officesdk/design)
├── docs/                  # Documentation MDX files
├── .storybook/           # Storybook configuration
├── scripts/              # Build and validation scripts
└── storybook-static/     # Built Storybook output
```

## Coding Standards

### Naming Conventions

- **Components**: PascalCase (e.g., `Button`, `SearchInput`)
- **Directories**: kebab-case (e.g., `search-input`, `toolbar-button`)
- **Files**: 
  - Component files: `ComponentName.tsx`
  - Test files: `ComponentName.test.tsx` (in `__tests__` folder)
  - Story files: `ComponentName.stories.tsx`
  - Index files: `index.ts`

### Export Convention

**IMPORTANT**: Use Named Exports ONLY. Default exports are prohibited.

```tsx
// ✅ Correct
export const Button = () => { ... };

// ❌ Wrong
export default Button;
```

### Component File Structure

Each component must follow this structure:

```
component-name/
├── index.ts                    # Exports
├── ComponentName.tsx           # Main component logic
├── ComponentName.stories.tsx   # Storybook stories
└── __tests__/
    └── ComponentName.test.tsx  # Unit tests
```

### TypeScript Guidelines

- Always use TypeScript with strict mode
- Define explicit types for all props
- Use interfaces for component props
- Avoid using `any` type
- Export all public types and interfaces

Example:

```tsx
export interface ButtonProps {
  variant?: 'solid' | 'outline' | 'ghost';
  colorType?: 'default' | 'primary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'solid',
  colorType = 'default',
  size = 'medium',
  children,
  ...props
}) => {
  // Implementation
};
```

### No Chinese Characters

**CRITICAL**: Do NOT use Chinese characters in code or comments. All comments, variable names, and documentation should be in English.

```tsx
// ✅ Correct
// Handle button click event
const handleClick = () => { ... };

// ❌ Wrong
// 处理按钮点击事件
const handleClick = () => { ... };
```

## Development Workflow

### Common Commands

```bash
# Install dependencies
yarn install

# Start Storybook development server (port 6006)
yarn dev

# Build all packages
yarn build

# Run tests
yarn test

# Run tests with UI
yarn test:ui

# Type check
yarn type-check

# Lint code
yarn lint

# Fix lint issues
yarn lint:fix

# Format code
yarn format

# Validate everything (lint + type-check + test)
yarn validate

# Clean build artifacts
yarn clean
```

### Making Changes

1. Create a new branch for your feature/fix
2. Make your changes following the coding standards
3. Ensure all tests pass: `yarn validate`
4. Add changeset if needed: `yarn changeset`
5. Let the user review and commit manually

### Git Workflow

**IMPORTANT**: DO NOT commit automatically. After completing tasks:

1. Show the user what files have been changed
2. Let the user review the changes
3. Only execute commit and push when the user explicitly requests it

```bash
# ❌ Don't do this automatically
git add .
git commit -m "feat: add new component"
git push

# ✅ Ask the user first
# "I've completed the changes. Would you like me to commit and push them?"
```

## Package Development

### Components Package (`packages/components`)

- Contains all UI components
- Each component should have stories and tests
- Components use styled-components for styling
- Import theme and icons from their respective packages

### Theme Package (`packages/theme`)

- Provides theme configuration
- Exports `lightTheme`, `darkTheme`, etc.
- Defines color palettes, typography, spacing, etc.

### Icons Package (`packages/icons`)

- SVG icons as React components
- Uses Lucide React as the icon library
- Export `iconRegistry` for use with `initUIConfig` or `UIConfigProvider`

### Utils Package (`packages/utils`)

- Common utility functions
- Helper functions like `classNames`, `debounce`, etc.

## Testing

### Test Requirements

- Write unit tests for all components
- Use Vitest and React Testing Library
- Test file location: `__tests__/ComponentName.test.tsx`
- Aim for good coverage of user interactions

Example test:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    screen.getByText('Click me').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Storybook

### Story Requirements

- Every component must have a `.stories.tsx` file
- Include multiple story variants
- Document all props using ArgTypes
- Provide interactive controls

Example story:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Click me',
    variant: 'solid',
    colorType: 'default',
  },
};

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'solid',
    colorType: 'primary',
  },
};
```

## UI Configuration

### Recommended: Using initUIConfig

**The recommended way** to configure the UI library is using `initUIConfig()` instead of `UIConfigProvider`:

{% raw %}
```tsx
import { initUIConfig } from '@officesdk/design';
import { lightTheme } from '@officesdk/design/theme';
import { iconRegistry } from '@officesdk/design/icons';

// Initialize before React app starts (e.g., in index.tsx or main.tsx)
initUIConfig({
  theme: lightTheme,
  icons: iconRegistry,
  locale: 'en-US',
  toast: {
    defaultDuration: 3000,
    maxCount: 5,
  },
});

// Now you can use components without UIConfigProvider
function App() {
  return <Button>Click me</Button>;
}
```
{% endraw %}

**Benefits of `initUIConfig`:**
- ✅ No React Provider dependency - works in non-React environments
- ✅ Avoid Provider nesting - useful for Modal/Portal scenarios
- ✅ Global styles injected on-demand - only when components are first used
- ✅ Can be called before React app starts
- ✅ Simpler setup - no need to wrap your app in a Provider

**When to use `initUIConfig` vs `UIConfigProvider`:**
- Use `initUIConfig` when:
  - You want a simpler global configuration (recommended for most cases)
  - You want to avoid Provider nesting (e.g., Modal components)
  - You need to configure before React app starts
  - You're in a non-React environment
- Use `UIConfigProvider` when:
  - You need per-component-tree configuration
  - You want to switch configurations dynamically within the same app
  - You prefer the React Context pattern

### Alternative: Using UIConfigProvider (Optional)

If you need per-component-tree configuration or prefer the React Context pattern:

{% raw %}
```tsx
import { UIConfigProvider } from '@officesdk/design';
import { lightTheme } from '@officesdk/design/theme';
import { iconRegistry } from '@officesdk/design/icons';

function App() {
  return (
    <UIConfigProvider config={{
      theme: lightTheme,
      icons: iconRegistry,
      locale: 'en-US',
      toast: {
        defaultDuration: 3000,
        maxCount: 5,
      },
    }}>
      {/* Your app */}
    </UIConfigProvider>
  );
}
```
{% endraw %}

Note: `UIConfigProvider` is still supported but `initUIConfig` is recommended for most use cases.

## Common Patterns

### Using Theme

{% raw %}
```tsx
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.palettes.brand};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
`;
```
{% endraw %}

### Using Icons

```tsx
import { useUIConfig } from '@officesdk/design';

const MyComponent = () => {
  const { icons } = useUIConfig();
  const CheckIcon = icons.Check;
  
  return <CheckIcon size={16} />;
};
```

## Release Process

The project uses Changesets for version management:

1. Make changes
2. Run `yarn changeset` to create a changeset
3. Describe the changes (patch/minor/major)
4. Merge PR
5. Changesets will create a version PR automatically
6. Merge version PR to publish to npm

## Troubleshooting

### Common Issues

1. **Build Errors**: Run `yarn clean` then `yarn install` and `yarn build`
2. **Type Errors**: Run `yarn type-check` to see all type issues
3. **Test Failures**: Run `yarn test` to see detailed error messages
4. **Storybook Issues**: Clear cache with `rm -rf node_modules/.cache`

## Best Practices

1. **Keep Components Small**: Each component should do one thing well
2. **Use Composition**: Build complex components from simpler ones
3. **Think in Props**: Design clear, intuitive prop APIs
4. **Write Tests First**: Consider TDD for complex logic
5. **Document Edge Cases**: Add stories for all component states
6. **Accessibility**: Ensure components are keyboard and screen-reader friendly
7. **Performance**: Use React.memo and useMemo when appropriate
8. **Responsive Design**: Components should work on all screen sizes

## Questions to Ask

When implementing a new feature or component:

1. Does this follow our naming conventions?
2. Are all exports named (not default)?
3. Is there a test file with good coverage?
4. Is there a story file with multiple variants?
5. Are all TypeScript types properly defined?
6. Is the component accessible?
7. Does it work with the theme system?
8. Is the documentation clear?
9. Are there any Chinese characters to remove?
10. Have I let the user review before committing?

## Additional Resources

- [Storybook Documentation](http://localhost:6006) (when running `yarn dev`)
- [Vitest Docs](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [styled-components](https://styled-components.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Summary

When working on this project:

- ✅ Use Named Exports only
- ✅ Follow kebab-case for directories, PascalCase for components
- ✅ Write tests and stories for all components
- ✅ Use English for all code and comments
- ✅ Let users review before committing
- ✅ Run `yarn validate` before finishing
- ❌ Never use default exports
- ❌ Never use Chinese characters
- ❌ Never commit without user approval
