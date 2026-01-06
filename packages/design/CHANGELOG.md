# @officesdk/design

## 0.1.6

### Patch Changes

- d23968c: feat: add prefixCls to tooltip

## 0.1.5

### Patch Changes

- 6db9e08: Add custom styled utility with automatic global theme injection

  - Implement styled utility that automatically injects global theme via defaultProps getter
  - Theme is accessible even outside UIConfigProvider (e.g., in portals, separate React.render)
  - Migrate all components to use custom styled utility instead of direct styled-components import
  - Add comprehensive tests for styled utility
  - Export styled and getGlobalTheme utilities

## 0.1.4

### Patch Changes

- d8266ee: Add custom styled utility with automatic global theme injection

  - Implement styled utility that automatically injects global theme via defaultProps getter
  - Theme is accessible even outside UIConfigProvider (e.g., in portals, separate React.render)
  - Migrate all components to use custom styled utility instead of direct styled-components import
  - Add comprehensive tests for styled utility
  - Export styled and getGlobalTheme utilities

## 0.1.3

### Patch Changes

- Improve build output structure and type definitions:
  - Generate proper .d.ts files in both CJS and ESM directories
  - Use .js extension for ESM files with package.json type module marker
  - Clearer separation between CJS and ESM outputs
  - Better TypeScript support and module resolution

## 0.1.2

### Patch Changes

- Add NumberInput component with unit support:
  - New standalone NumberInput component extracted from SpinButton
  - Support for unit text display (e.g., 'px', '%', 'deg')
  - Comprehensive test coverage with 19 test cases
  - Full Storybook documentation with multiple examples
  - SpinButton refactored to use NumberInput internally

## 0.1.1

### Patch Changes

- Fix Tooltip component rendering and styled-components compatibility issues:
  - Fixed tooltip overlay not rendering by adding wrapper span for event handlers
  - Fixed tooltip arrow positioning and visibility
  - Optimized global styles to render only once in UIConfigProvider
  - Changed to static CSS class-based styling to avoid conditional render issues
  - Updated styled-components peer dependency to support >=5.2.0 for better compatibility
  - Added documentation for resolving multiple styled-components instances

## 0.1.0

### Patch Changes

- initial
