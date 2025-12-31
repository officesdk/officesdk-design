# @officesdk/design

> OfficeSdk UI Component Library - A modern UI component library built with React and styled-components

## Installation

```bash
npm install @officesdk/design styled-components@^5.3.0
```

## Quick Start

```tsx
import { Button, UIConfigProvider, createUIConfig } from '@officesdk/design';
import { lightTheme } from '@officesdk/design/theme';

const config = createUIConfig({
  theme: lightTheme,
});

function App() {
  return (
    <UIConfigProvider config={config}>
      <Button>Click Me</Button>
    </UIConfigProvider>
  );
}
```

## Importing Modules

```tsx
// Components
import { Button, Input, Tooltip } from '@officesdk/design';

// Theme
import { lightTheme } from '@officesdk/design/theme';

// Icons
import { Search, Close } from '@officesdk/design/icons';

// Utils
import { deepMerge } from '@officesdk/design/utils';
```

## Documentation

- [Full Documentation](https://github.com/officesdk/officesdk-design#readme)
- [Storybook](https://officesdk.github.io/officesdk-design)
- [Changelog](https://github.com/officesdk/officesdk-design/blob/main/CHANGELOG.md)

## License

MIT © OfficeSdk Team
