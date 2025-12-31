# @officesdk/design-icons

Built-in icon resources for OfficeSdk Design.

## Installation

This package is included in `@officesdk/design` and doesn't need to be installed separately.

## Usage

```typescript
import { Icon, IconProvider } from '@officesdk/design';
import { iconRegistry } from '@officesdk/design/icons';

// Use with IconProvider
<IconProvider icons={iconRegistry}>
  <Icon name="close" size={16} />
</IconProvider>
```



