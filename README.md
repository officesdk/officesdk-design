# @officesdk/design

> Officesdk UI Component Library - A modern UI component library built with React and styled-components

## Features

- **Modern Design** - Clean and beautiful design style
- **TypeScript Support** - Full type definitions
- **Flexible Styling** - Built with styled-components, easy to customize
- **Tree Shaking** - Supports on-demand loading
- **Ready to Use** - Complete default configuration
- **Well Documented** - Detailed component documentation and examples
- **Monorepo Architecture** - Clear package management structure

## Installation

```bash
# Using yarn
yarn add @officesdk/design

# Using npm
npm install @officesdk/design

# Using pnpm
pnpm add @officesdk/design
```

> **Note**: `@officesdk/design` includes all components, themes, and utility functions. You can use different import paths for specific features.

## Quick Start

```tsx
import React from 'react';
import { Button, UIConfigProvider, createUIConfig } from '@officesdk/design';
import { lightTheme } from '@officesdk/design/theme';
import { iconRegistry } from '@officesdk/design/icons';

const config = createUIConfig({
  theme: lightTheme,
  icons: iconRegistry,
});

function App() {
  return (
    <UIConfigProvider config={config}>
      <Button variant="solid" colorType="default">
        Click Me
      </Button>
    </UIConfigProvider>
  );
}

export default App;
```

## Documentation

For complete component documentation and examples, visit our [Storybook Documentation](https://officesdk.github.io/officesdk-design/?path=/docs/documentation-introduction--docs).

View documentation locally:

```bash
yarn dev
```

Then visit http://localhost:6006

## Usage

### Import Components and Configuration

```tsx
import { Button, UIConfigProvider, createUIConfig } from '@officesdk/design';
import { lightTheme } from '@officesdk/design/theme';
import { iconRegistry } from '@officesdk/design/icons';
```

### On-Demand Import

```tsx
// Import theme only
import { theme } from '@officesdk/design/theme';

// Import utilities only
import { classNames, debounce } from '@officesdk/design/utils';
```

## Project Structure

```
officesdk-design/
 packages/
    components/        # UI components package
    theme/             # Theme system package
    utils/             # Utilities package
    icons/             # icons package
 docs/                  # Documentation
 .storybook/            # Storybook configuration
 package.json           # Root configuration
```

## Development

> If you encounter installation or runtime issues, please check the [Setup Guide](./SETUP.md)

### Install Dependencies

```bash
yarn install
```

### Start Development Server

```bash
yarn dev
```

### Build All Packages

```bash
yarn build
```

### Type Check

```bash
yarn type-check
```

### Lint Code

```bash
yarn lint
```

### Clean Build Artifacts

```bash
yarn clean
```

## Packages

### @officesdk/design-components

Core UI components package containing all reusable React components.

### @officesdk/design-theme

Theme system package providing default theme configuration and type definitions.

### @officesdk/design-utils

Utilities package providing common utility functions.

## Custom Configuration

```tsx
import { UIConfigProvider, createUIConfig } from '@officesdk/design';
import { lightTheme } from '@officesdk/design/theme';
import { iconRegistry } from '@officesdk/design/icons';

// Create custom configuration
const config = createUIConfig({
  theme: {
    ...lightTheme,
    colors: {
      ...lightTheme.colors,
      palettes: {
        ...lightTheme.colors.palettes,
        brand: '#ff6b6b', // Custom brand color
      },
    },
  },
  icons: iconRegistry,
  toast: {
    defaultDuration: 5000, // Custom toast duration
    maxCount: 3,
  },
  locale: 'zh-CN',
});

function App() {
  return <UIConfigProvider config={config}>{/* Your app */}</UIConfigProvider>;
}
```

## Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) and [Development Guide](./docs/Development.mdx).

### Quick Contribution Steps

```bash
# 1. Fork and clone
git clone git@github.com:YOUR_USERNAME/officesdk-design.git

# 2. Create branch
git checkout -b feat/your-feature

# 3. Make changes and test
yarn dev
yarn test
yarn validate

# 4. Add changeset
yarn changeset

# 5. Commit and push
git commit -m "feat: your feature"
git push origin feat/your-feature

# 6. Create PR
```

## Release Process

We use [Changesets](https://github.com/changesets/changesets) for automated releases.

**For Contributors**: Add a changeset with `yarn changeset` after making changes.

**For Maintainers**: See [Release Documentation](./docs/Release.mdx) and [NPM Setup Guide](./docs/NPM-Setup.md).

## Release Process

We use [Changesets](https://github.com/changesets/changesets) for automated version management and publishing.

### For Contributors

```bash
# 1. Make changes and commit
git commit -m "feat: add new component"

# 2. Add changeset
yarn changeset

# 3. Create PR and merge
# Changesets will automatically create a version PR

# 4. Merge version PR to publish
```

See [Release Documentation](./docs/Release.mdx) for detailed information.

## License

MIT

## Links

- [Documentation](https://github.com/officesdk/officesdk-design#readme)
- [Storybook](https://officesdk.github.io/officesdk-design) (Coming soon)
- [NPM Package](https://www.npmjs.com/package/@officesdk/design)
- [GitHub](https://github.com/officesdk/officesdk-design)
- [Issues](https://github.com/officesdk/officesdk-design/issues)
- [Changelog](./CHANGELOG.md)
