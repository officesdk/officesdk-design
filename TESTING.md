# Testing Guide

## Overview

This project uses **Vitest** as the testing framework, along with **React Testing Library** for component testing.

## Test Coverage

Current test coverage (as of latest run):

| Metric         | Coverage   | Target | Status                          |
| -------------- | ---------- | ------ | ------------------------------- |
| **Statements** | **95.36%** | 70%    | [EMOJI][EMOJI][EMOJI] Excellent |
| **Branches**   | **82.85%** | 65%    | [EMOJI][EMOJI][EMOJI] Excellent |
| **Functions**  | **94.62%** | 70%    | [EMOJI][EMOJI][EMOJI] Excellent |
| **Lines**      | **97.32%** | 70%    | [EMOJI][EMOJI][EMOJI] Excellent |

### Component Coverage

| Component  | Statements | Branches | Functions | Lines  |
| ---------- | ---------- | -------- | --------- | ------ |
| Button     | 96.15%     | 76%      | 100%      | 96.15% |
| SpinButton | 95.83%     | 88.88%   | 96.42%    | 97.87% |
| Checkbox   | 90%        | 64.51%   | 84.61%    | 92.98% |
| Radio      | 94.87%     | 91.66%   | 90%       | 97.29% |
| Switch     | 98%        | 91.42%   | 100%      | 100%   |
| Slider     | 94.59%     | 90.9%    | 94.11%    | 97.14% |
| Icon       | 100%       | 89.28%   | 100%      | 100%   |

## Running Tests

```bash
# Run all tests once
yarn test --run

# Run tests in watch mode
yarn test

# Run tests with UI
yarn test:ui

# Generate coverage report
yarn test:coverage
```

## Test Structure

```
packages/components/src/
[EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI] __tests__/
[EMOJI][EMOJI]�   [EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI] test-utils.tsx          # Shared test utilities
[EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI] Button/
[EMOJI][EMOJI]�   [EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI] __tests__/
[EMOJI][EMOJI]�   [EMOJI][EMOJI]�   [EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI] Button.test.tsx     # 14 tests
[EMOJI][EMOJI]�   [EMOJI][EMOJI]�   [EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI] SpinButton.test.tsx # 20 tests
[EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI] Checkbox/
[EMOJI][EMOJI]�   [EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI] __tests__/
[EMOJI][EMOJI]�       [EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI] Checkbox.test.tsx   # 14 tests
[EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI] Radio/
[EMOJI][EMOJI]�   [EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI] __tests__/
[EMOJI][EMOJI]�       [EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI] Radio.test.tsx      # 12 tests
[EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI] Switch/
[EMOJI][EMOJI]�   [EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI] __tests__/
[EMOJI][EMOJI]�       [EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI] Switch.test.tsx     # 13 tests
[EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI] Slider/
[EMOJI][EMOJI]�   [EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI] __tests__/
[EMOJI][EMOJI]�       [EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI] Slider.test.tsx     # 19 tests
[EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI] Icon/
    [EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI] __tests__/
        [EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI] Icon.test.tsx       # 11 tests
```

## Test Statistics

- **Total Test Files**: 7
- **Total Tests**: 103
- **All Passing**: [EMOJI][EMOJI][EMOJI]
- **Average Execution Time**: ~3.5 seconds

## Writing Tests

### Basic Test Structure

```typescript
import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../../__tests__/test-utils';
import { YourComponent } from '../YourComponent';

describe('YourComponent', () => {
  it('should render correctly', () => {
    render(<YourComponent />);
    expect(screen.getByRole('...')).toBeInTheDocument();
  });
});
```

### Using Test Utilities

The `test-utils.tsx` file provides a custom `render` function that automatically wraps components with:

- UIConfigProvider (includes ThemeProvider, IconProvider, ToastContainer)

```typescript
import { render } from '../../__tests__/test-utils';

// This automatically includes all UI configuration context
render(<YourComponent />);
```

### Testing User Interactions

```typescript
it('should handle click', async () => {
  const handleClick = vi.fn();
  const user = userEvent.setup();

  render(<Button onClick={handleClick}>Click</Button>);

  await user.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalled();
});
```

### Testing Keyboard Interactions

```typescript
it('should be keyboard accessible', async () => {
  const user = userEvent.setup();

  render(<Input />);

  const input = screen.getByRole('textbox');
  await user.type(input, 'Hello');
  await user.keyboard('{Enter}');

  expect(input).toHaveValue('Hello');
});
```

## Best Practices

1. **Test user behavior, not implementation details**
2. **Use semantic queries** (`getByRole`, `getByLabelText`)
3. **Test accessibility** (keyboard navigation, ARIA attributes)
4. **Test edge cases** (disabled, loading, error states)
5. **Keep tests simple and readable**
6. **Use `data-testid` as last resort**

## Continuous Integration

Tests run automatically on:

- Every push
- Every pull request
- Before publishing

## Coverage Thresholds

Configured in `vitest.config.ts`:

```typescript
coverage: {
  thresholds: {
    lines: 70,
    functions: 70,
    branches: 65,
    statements: 70,
  },
}
```

## Troubleshooting

### Tests failing locally

```bash
# Clear cache and re-run
rm -rf node_modules/.vite
yarn test --run
```

### Coverage not generating

```bash
# Ensure coverage dependency is installed
yarn add -D @vitest/coverage-v8
```

### Act warnings

These warnings are expected for focus/blur events and can be safely ignored in most cases.

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
