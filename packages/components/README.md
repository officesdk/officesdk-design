# @officesdk/design-components

Officesdk  UI Core Components Package

## Installation

```bash
yarn add @officesdk/design styled-components@^5.3.0
```

## Usage

```tsx
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
```

## Components

- Button - Button component

More components coming soon...

## Documentation

View full documentation in the main repository.
