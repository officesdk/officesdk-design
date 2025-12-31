# @officesdk/ui

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
