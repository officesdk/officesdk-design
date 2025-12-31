# @officesdk/design-theme

Officesdk  Design Theme System

## Installation

```bash
yarn add @officesdk/design styled-components@^5.3.0
```

## Usage

```tsx
import { theme } from '@officesdk/design';
import { ThemeProvider } from 'styled-components';

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* Your app */}
    </ThemeProvider>
  );
}
```

## Custom Theme

```tsx
import { theme } from '@officesdk/design';
import { deepMerge } from '@officesdk/design/utils';

const customTheme = deepMerge(theme, {
  colors: {
    brand: '#your-color',
  },
});
```

## Documentation

View full documentation in the main repository.
