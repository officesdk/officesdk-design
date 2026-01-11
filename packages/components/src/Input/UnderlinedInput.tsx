// React is required for JSX transform (jsx: "react")
import React, { forwardRef } from 'react';
import { Input, InputProps } from './Input';

/**
 * UnderlinedInput Component
 *
 * @deprecated Use <Input lineType="underlined" /> instead
 *
 * This component is a simple alias for Input with lineType="underlined"
 * and will be removed in a future version.
 *
 * @example
 * // Old way (deprecated)
 * <UnderlinedInput placeholder="Search..." />
 *
 * // New way (recommended)
 * <Input lineType="underlined" placeholder="Search..." />
 */
export const UnderlinedInput = forwardRef<HTMLInputElement, Omit<InputProps, 'lineType'>>(
  (props, ref) => {
    // React is used implicitly by JSX transform
    void React;
    return <Input {...props} lineType="underlined" ref={ref} />;
  }
);

UnderlinedInput.displayName = 'UnderlinedInput';

export type { InputProps as UnderlinedInputProps };
