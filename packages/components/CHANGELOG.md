# @officesdk/design-components

## 0.2.0

### Minor Changes

- ea8968d: add raw value for number input callback

## 0.1.4

### Patch Changes

- Updated dependencies [5105c2a]
  - @officesdk/design-theme@0.1.1

## 0.1.3

### Patch Changes

- 5f8b4d5: feat: implement global toast API with automatic rendering

  - Add global toast API (toast.success/info/error/warn/show/hide/hideAll/configure)
  - Support automatic rendering to DOM without manual ToastContainer placement
  - Compatible with React 18+ (createRoot) and React 17- (ReactDOM.render)
  - Add comprehensive documentation (USAGE.md) and Storybook examples (toastApi.stories.tsx)
  - Update ToastContainer to work independently for special use cases
  - All 269 tests passing

## 0.1.2

### Patch Changes

- 6377c28: feat: implement global toast API with automatic rendering

  - Add global toast API (toast.success/info/error/warn/show/hide/hideAll/configure)
  - Support automatic rendering to DOM without manual ToastContainer placement
  - Compatible with React 18+ (createRoot) and React 17- (ReactDOM.render)
  - Add comprehensive documentation (USAGE.md) and Storybook examples (toastApi.stories.tsx)
  - Update ToastContainer to work independently for special use cases
  - All 269 tests passing

## 0.1.1

### Patch Changes

- d8266ee: Add custom styled utility with automatic global theme injection

  - Implement styled utility that automatically injects global theme via defaultProps getter
  - Theme is accessible even outside UIConfigProvider (e.g., in portals, separate React.render)
  - Migrate all components to use custom styled utility instead of direct styled-components import
  - Add comprehensive tests for styled utility
  - Export styled and getGlobalTheme utilities
