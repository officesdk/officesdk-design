# @officesdk/ui

## 0.2.3

### Patch Changes

- 62a0d00: Add @officesdk/editor-sdk-core as dependency

  - Add @officesdk/editor-sdk-core to dependencies for proper type resolution
  - Ensures theme types work correctly when package is installed
  - Users will automatically get required type definitions

## 0.2.2

### Patch Changes

- e1cd1c6: Improve React compatibility

  - Update peerDependencies to support React >=16.9.0
  - Ensures compatibility with React 16.9+, 17.x, and 18.x
  - Allows users with older React versions to use the library

## 0.2.1

### Patch Changes

- b0deb6e: Fix SpinButton sizing issues

  - Correct small size to 24px height and 72px width (was 28px and 60px)
  - Correct large size to 32px height and 80px width (was 36px and 80px)
  - Fix button layout to ensure up/down buttons each occupy exactly 50% height
  - Update button widths: small 28px, large 32px
  - Add proper hover and active box-shadows

## 0.2.0

### Minor Changes

- c382e3b: Initial release of @officesdk/ui component library

  ## New Components

  - **Input**: Text input component with prefix/suffix node support

    - Sizes: small, medium, large, extraLarge
    - States: default, hover, active, error, disabled, readonly
    - Support for custom prefix and suffix elements

  - **SearchInput**: Search input component with built-in search icon

    - Sizes: large, extraLarge
    - Built-in search icon
    - Clearable with clear button
    - Based on Input component

  - **Tooltip**: Tooltip component with theme customization
    - Variants: black, white
    - Sizes: small, large (for white variant)
    - Based on rc-tooltip
    - Full theme integration
    - Multiple placement options

  ## Existing Components

  - Button with multiple variants and states
  - SpinButton for numeric input
  - Switch toggle component
  - Radio button component
  - Checkbox component
  - Slider component
  - Tabs component
  - Toast notification system

  ## Theme System

  - Complete theme configuration
  - Light theme with comprehensive color palette
  - Component-specific theme tokens
  - Typography system
  - Box shadow and border radius tokens

  ## Infrastructure

  - Pre-commit hooks with husky and lint-staged
  - Automated testing with Vitest
  - Storybook documentation
  - TypeScript support
  - Comprehensive test coverage

  ## Documentation

  - Component documentation
  - Theme system guide
  - Contributing guidelines
  - Release process documentation
