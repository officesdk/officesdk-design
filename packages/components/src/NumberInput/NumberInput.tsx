import React, { useState, useCallback, useRef, useEffect } from 'react';
import styled from 'styled-components';

export interface NumberInputProps {
  /**
   * Current value
   */
  value?: number;
  /**
   * Default value
   */
  defaultValue?: number;
  /**
   * Minimum value
   */
  min?: number;
  /**
   * Maximum value
   */
  max?: number;
  /**
   * Step increment/decrement
   */
  step?: number;
  /**
   * Size variant
   */
  size?: 'small' | 'large';
  /**
   * Whether the input is disabled
   */
  disabled?: boolean;
  /**
   * Whether to show alert state (red border)
   */
  alert?: boolean;
  /**
   * Number of decimal places
   */
  precision?: number;
  /**
   * Format the display value
   */
  formatter?: (value: number) => string;
  /**
   * Parse the input value
   */
  parser?: (displayValue: string) => number;
  /**
   * Callback when value changes
   */
  onChange?: (value: number | null) => void;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Custom style
   */
  style?: React.CSSProperties;
}

const NumberInputContainer = styled.div<{
  $size: 'small' | 'large';
  $disabled: boolean;
  $alert: boolean;
  $isFocused: boolean;
}>`
  display: inline-flex;
  align-items: center;
  background: white;
  border: 1px solid;
  border-radius: 2px;
  flex-shrink: 0;

  ${({ $size }) =>
    $size === 'small'
      ? `
    height: 24px;
    width: 72px;
  `
      : `
    height: 32px;
    width: 80px;
  `}

  ${({ $disabled, $alert, $isFocused, theme }) => {
    if ($disabled) {
      return `
        border-color: ${theme.colors.palettes.transparency['10']};
        cursor: not-allowed;
      `;
    }
    if ($alert) {
      return `
        border-color: ${theme.colors.palettes.red['6']};
      `;
    }
    if ($isFocused) {
      return `
        border-color: ${theme.colors.palettes.transparency['30']};
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.04);
      `;
    }
    return `
      border-color: ${theme.colors.palettes.transparency['10']};

      &:hover {
        border-color: ${theme.colors.palettes.transparency['20']};
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.04);
      }
    `;
  }}
`;

const InputWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 8px;
  min-width: 0;
`;

const StyledInput = styled.input<{ $size: 'small' | 'large'; $disabled: boolean }>`
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-family: 'PingFang SC', sans-serif;
  font-weight: 400;
  line-height: 20px;
  padding: 0;
  margin: 0;

  ${({ $size }) =>
    $size === 'small'
      ? `
    font-size: 12px;
  `
      : `
    font-size: 13px;
  `}

  ${({ $disabled, theme }) =>
    $disabled
      ? `
    color: ${theme.colors.palettes.transparency['30']};
    cursor: not-allowed;
  `
      : `
    color: ${theme.colors.palettes.gray['120']};
  `}

  &::placeholder {
    color: ${({ theme }) => theme.colors.palettes.transparency['30']};
  }

  /* Remove number input arrows */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }
`;

const ButtonGroup = styled.div<{ $alert: boolean; $disabled: boolean }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-left: 1px solid;
  flex-shrink: 0;

  ${({ $disabled, $alert, theme }) => {
    if ($disabled) {
      return `border-color: ${theme.colors.palettes.transparency['10']};`;
    }
    if ($alert) {
      return `border-color: ${theme.colors.palettes.red['6']};`;
    }
    return `border-color: ${theme.colors.palettes.transparency['10']};`;
  }}
`;

const StepButton = styled.button<{ $position: 'up' | 'down'; $alert: boolean; $disabled: boolean }>`
  flex: 1 1 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 1px 8px;
  outline: none;
  min-height: 0;
  overflow: hidden;

  ${({ $position, $alert, $disabled, theme }) => {
    if ($position === 'up') {
      return `
        border-bottom: 1px solid ${
          $disabled
            ? theme.colors.palettes.transparency['10']
            : $alert
            ? theme.colors.palettes.red['6']
            : theme.colors.palettes.transparency['10']
        };
      `;
    }
    return '';
  }}

  ${({ $disabled, theme }) => {
    if ($disabled) {
      return `
        cursor: not-allowed;
        opacity: 0.4;
      `;
    }
    return `
      &:hover {
        background-color: ${theme.colors.palettes.transparency['5']};
      }

      &:active {
        background-color: ${theme.colors.palettes.transparency['10']};
      }
    `;
  }}

  svg {
    width: 14px;
    height: 14px;
    fill: ${({ $disabled, theme }) =>
      $disabled ? theme.colors.palettes.transparency['30'] : theme.colors.palettes.gray['120']};
  }
`;

const UpArrow = () => (
  <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 4.5L10.5 8.5H3.5L7 4.5Z" fill="currentColor" />
  </svg>
);

const DownArrow = () => (
  <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 9.5L3.5 5.5H10.5L7 9.5Z" fill="currentColor" />
  </svg>
);

/**
 * NumberInput Component
 *
 * A numeric input with increment/decrement buttons
 *
 * @example
 * <NumberInput value={35} onChange={(val) => console.log(val)} />
 */
export const NumberInput: React.FC<NumberInputProps> = ({
  value: controlledValue,
  defaultValue = 0,
  min = -Infinity,
  max = Infinity,
  step = 1,
  size = 'large',
  disabled = false,
  alert = false,
  precision,
  formatter,
  parser,
  onChange,
  className,
  style,
}) => {
  const [internalValue, setInternalValue] = useState<number>(controlledValue ?? defaultValue);
  const [displayValue, setDisplayValue] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  // Format value for display
  const formatValue = useCallback(
    (val: number): string => {
      if (formatter) {
        return formatter(val);
      }
      if (precision !== undefined) {
        return val.toFixed(precision);
      }
      return String(val);
    },
    [formatter, precision]
  );

  // Parse display value to number
  const parseValue = useCallback(
    (displayVal: string): number | null => {
      if (parser) {
        return parser(displayVal);
      }
      const parsed = parseFloat(displayVal);
      return isNaN(parsed) ? null : parsed;
    },
    [parser]
  );

  // Update display value when value changes
  useEffect(() => {
    if (!isFocused) {
      setDisplayValue(formatValue(value));
    }
  }, [value, isFocused, formatValue]);

  // Clamp value to min/max
  const clampValue = useCallback(
    (val: number): number => {
      return Math.max(min, Math.min(max, val));
    },
    [min, max]
  );

  // Handle value change
  const handleValueChange = useCallback(
    (newValue: number) => {
      const clampedValue = clampValue(newValue);

      if (controlledValue === undefined) {
        setInternalValue(clampedValue);
      }

      onChange?.(clampedValue);
    },
    [clampValue, controlledValue, onChange]
  );

  // Increment value
  const increment = useCallback(() => {
    if (disabled) return;
    handleValueChange(value + step);
  }, [disabled, value, step, handleValueChange]);

  // Decrement value
  const decrement = useCallback(() => {
    if (disabled) return;
    handleValueChange(value - step);
  }, [disabled, value, step, handleValueChange]);

  // Handle input change
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayValue(e.target.value);
  }, []);

  // Handle input blur
  const handleBlur = useCallback(() => {
    setIsFocused(false);
    const parsed = parseValue(displayValue);
    if (parsed !== null) {
      handleValueChange(parsed);
    } else {
      setDisplayValue(formatValue(value));
    }
  }, [displayValue, parseValue, handleValueChange, value, formatValue]);

  // Handle input focus
  const handleFocus = useCallback(() => {
    setIsFocused(true);
    setDisplayValue(String(value));
  }, [value]);

  // Handle keyboard events
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        increment();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        decrement();
      } else if (e.key === 'Enter') {
        inputRef.current?.blur();
      }
    },
    [increment, decrement]
  );

  return (
    <NumberInputContainer 
      $size={size} 
      $disabled={disabled} 
      $alert={alert} 
      $isFocused={isFocused}
      className={className}
      style={style}
    >
      <InputWrapper>
        <StyledInput
          ref={inputRef}
          type="text"
          value={displayValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          $size={size}
          $disabled={disabled}
        />
      </InputWrapper>

      <ButtonGroup $alert={alert} $disabled={disabled}>
        <StepButton
          type="button"
          $position="up"
          $alert={alert}
          $disabled={disabled}
          onClick={increment}
          disabled={disabled}
          tabIndex={-1}
        >
          <UpArrow />
        </StepButton>

        <StepButton
          type="button"
          $position="down"
          $alert={alert}
          $disabled={disabled}
          onClick={decrement}
          disabled={disabled}
          tabIndex={-1}
        >
          <DownArrow />
        </StepButton>
      </ButtonGroup>
    </NumberInputContainer>
  );
};

NumberInput.displayName = 'NumberInput';

