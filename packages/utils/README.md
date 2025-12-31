# @officesdk/design-utils

Officesdk design Utilities Package 

## Installation

```bash
yarn add @officesdk/design
```

## Usage

```tsx
import { classNames, debounce, throttle, deepMerge } from '@officesdk/design/utils';

// Merge class names
const className = classNames('btn', isActive && 'active', 'primary');

// Debounce
const debouncedFn = debounce(() => console.log('debounced'), 300);

// Throttle
const throttledFn = throttle(() => console.log('throttled'), 300);

// Deep merge
const merged = deepMerge(obj1, obj2);
```

## API

### classNames(...classes)

Merge class names, automatically filters falsy values.

### debounce(func, wait)

Create a debounced function that delays invoking func until after wait milliseconds.

### throttle(func, limit)

Create a throttled function that limits invocation to once per limit milliseconds.

### deepMerge(target, ...sources)

Deep merge objects recursively.

## Documentation

View full documentation in the main repository.
