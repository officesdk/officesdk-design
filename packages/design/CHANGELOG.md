# @officesdk/design

## 0.1.12

### Patch Changes

- 0524099: feat: add inputStyle and inputClassName props to Input

## 0.1.11

### Patch Changes

- 3b6e0e3: feat: add clickPreventDefault to Radio and Checkbox to block internal onchange

## 0.1.10

### Patch Changes

- 44f8525: fix: Fix switch animation failing to trigger

## 0.1.9

### Patch Changes

- e183549: feat: add menu, dropdownButton and dropdown
- 2af3c16: feat: add UnderlineInput and SearchInput

## 0.1.8

### Patch Changes

- 5f8b4d5: feat: implement global toast API with automatic rendering

  - Add global toast API (toast.success/info/error/warn/show/hide/hideAll/configure)
  - Support automatic rendering to DOM without manual ToastContainer placement
  - Compatible with React 18+ (createRoot) and React 17- (ReactDOM.render)
  - Add comprehensive documentation (USAGE.md) and Storybook examples (toastApi.stories.tsx)
  - Update ToastContainer to work independently for special use cases
  - All 269 tests passing

## 0.1.7

### Patch Changes

- 6377c28: feat: implement global toast API with automatic rendering

  - Add global toast API (toast.success/info/error/warn/show/hide/hideAll/configure)
  - Support automatic rendering to DOM without manual ToastContainer placement
  - Compatible with React 18+ (createRoot) and React 17- (ReactDOM.render)
  - Add comprehensive documentation (USAGE.md) and Storybook examples (toastApi.stories.tsx)
  - Update ToastContainer to work independently for special use cases
  - All 269 tests passing

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
