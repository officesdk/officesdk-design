# Styled Components Usage Guide

## Overview

The `styled` utility from `@officesdk/design` is an enhanced version of `styled-components` that automatically injects the global theme. This solves the common problem of components losing theme context when rendered in portals, separate `React.render()` calls, or outside the main application tree.

## Key Features

1. **Automatic Theme Injection**: Components automatically receive the global theme via `defaultProps`
2. **No Provider Required**: Works without wrapping in `ThemeProvider` (but you can still use it)
3. **Portal-Friendly**: Perfect for components rendered in portals, tooltips, modals, etc.
4. **Type-Safe**: Full TypeScript support with theme typing

## Basic Usage

### Simple Styled Component

```typescript
import { styled } from '@officesdk/design';

const StyledButton = styled.button`
  background: ${props => props.theme.colors.background.primary};
  color: ${props => props.theme.colors.text.primary};
  padding: ${props => props.theme.components.button.medium.padding};
  border-radius: ${props => props.theme.borderRadius.medium};
  
  &:hover {
    background: ${props => props.theme.colors.background.secondary};
  }
`;

// Use it directly - no ThemeProvider needed!
export const MyComponent = () => (
  <StyledButton>Click me</StyledButton>
);
```

### Usage in Portals

```typescript
import ReactDOM from 'react-dom';
import { styled } from '@officesdk/design';

const TooltipContent = styled.div`
  background: ${props => props.theme.colors.background.primary};
  color: ${props => props.theme.colors.text.primary};
  padding: 8px 12px;
  border-radius: 4px;
  box-shadow: ${props => props.theme.boxShadow.medium};
`;

export const Tooltip = ({ content, targetElement }) => {
  return ReactDOM.createPortal(
    // Theme is automatically available even in portal!
    <TooltipContent>{content}</TooltipContent>,
    document.body
  );
};
```

### Separate React.render() Calls

```typescript
import React from 'react';
import ReactDOM from 'react-dom';
import { styled } from '@officesdk/design';

const StatusBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${props => props.theme.colors.background.secondary};
  color: ${props => props.theme.colors.text.secondary};
  padding: 8px 16px;
`;

// Render in a separate root - theme still works!
const statusBarRoot = document.getElementById('status-bar');
if (statusBarRoot) {
  ReactDOM.render(
    <StatusBar>Status: Ready</StatusBar>,
    statusBarRoot
  );
}
```

## Advanced Usage

### With ThemeProvider (Optional)

You can still use `ThemeProvider` for dynamic theme switching:

```typescript
import { styled, ThemeProvider, getGlobalTheme } from '@officesdk/design';
import { darkTheme } from '@officesdk/design/theme';

const ThemedContainer = styled.div`
  background: ${props => props.theme.colors.background.primary};
  color: ${props => props.theme.colors.text.primary};
`;

export const App = () => {
  const [isDark, setIsDark] = useState(false);
  
  return (
    <ThemeProvider theme={isDark ? darkTheme : getGlobalTheme()}>
      <ThemedContainer>
        <button onClick={() => setIsDark(!isDark)}>
          Toggle Theme
        </button>
      </ThemedContainer>
    </ThemeProvider>
  );
};
```

### With withTheme HOC

For regular React components that need theme access:

```typescript
import { withTheme } from '@officesdk/design';
import type { Theme } from '@officesdk/design/theme';

interface MyComponentProps {
  theme: Theme;
  title: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ theme, title }) => (
  <div style={{ color: theme.colors.text.primary }}>
    {title}
  </div>
);

export default withTheme(MyComponent);
```

### Styling Existing Components

```typescript
import { styled } from '@officesdk/design';
import { Button } from '@officesdk/design';

const PrimaryButton = styled(Button)`
  background: ${props => props.theme.colors.background.primary};
  border: 2px solid ${props => props.theme.colors.border.primary};
  
  &:hover {
    transform: scale(1.05);
  }
`;
```

## How It Works

The enhanced `styled` function wraps styled-components and automatically sets `defaultProps.theme` to the global theme:

```typescript
// Simplified implementation
const createStyledWithTheme = (tag) => {
  const component = baseStyled(tag);
  
  component.defaultProps = {
    ...component.defaultProps,
    theme: getGlobalTheme(), // Automatic fallback theme
  };
  
  return component;
};
```

This means:
1. If a component is inside `ThemeProvider`, it uses the provider's theme
2. If not, it falls back to the global theme from `defaultProps`
3. No need to wrap everything in `ThemeProvider`

## Comparison: Before vs After

### Before (Without Enhanced Styled)

```typescript
// Problem: Theme lost in portal
import ReactDOM from 'react-dom';
import { styled } from '../utils/styled';
import { ThemeProvider } from 'styled-components';
import { getGlobalTheme } from '@officesdk/design';

const TooltipContent = styled.div`
  color: ${props => props.theme.colors.text.primary};
`;

const Tooltip = ({ content }) => {
  return ReactDOM.createPortal(
    // Must wrap in ThemeProvider again!
    <ThemeProvider theme={getGlobalTheme()}>
      <TooltipContent>{content}</TooltipContent>
    </ThemeProvider>,
    document.body
  );
};
```

### After (With Enhanced Styled)

```typescript
// Solution: Theme automatically available
import ReactDOM from 'react-dom';
import { styled } from '@officesdk/design';

const TooltipContent = styled.div`
  color: ${props => props.theme.colors.text.primary};
`;

const Tooltip = ({ content }) => {
  return ReactDOM.createPortal(
    // Just works! No extra provider needed
    <TooltipContent>{content}</TooltipContent>,
    document.body
  );
};
```

## Best Practices

1. **Import from @officesdk/design**: Always use the enhanced `styled` from the design system
   ```typescript
   import { styled } from '@officesdk/design'; // ✅ Correct
   import { styled } from '../utils/styled'; // ❌ Don't use directly
   ```

2. **Initialize UIConfigProvider Once**: Set up global theme at app root
   ```typescript
   import { UIConfigProvider } from '@officesdk/design';
   import { lightTheme } from '@officesdk/design/theme';
   
   ReactDOM.render(
     <UIConfigProvider config={{ theme: lightTheme }}>
       <App />
     </UIConfigProvider>,
     document.getElementById('root')
   );
   ```

3. **Use ThemeProvider for Dynamic Themes**: Only wrap in ThemeProvider when you need to override theme
   ```typescript
   // Only needed for theme switching
   <ThemeProvider theme={customTheme}>
     <Component />
   </ThemeProvider>
   ```

4. **Type Safety**: Leverage TypeScript for theme typing
   ```typescript
   import type { Theme } from '@officesdk/design/theme';
   
   const StyledDiv = styled.div<{ $highlighted?: boolean }>`
     color: ${props => props.theme.colors.text.primary};
     background: ${props => props.$highlighted 
       ? props.theme.colors.background.accent 
       : props.theme.colors.background.primary};
   `;
   ```

## Summary

The enhanced `styled` utility solves the common problem of theme availability in React applications by automatically injecting the global theme as a fallback. This makes it perfect for:

- ✅ Portal rendering
- ✅ Separate React trees
- ✅ Tooltips and popovers
- ✅ Modals and dialogs
- ✅ Any component that might be rendered outside the main provider tree

You get all the benefits of styled-components with automatic theme support everywhere!

