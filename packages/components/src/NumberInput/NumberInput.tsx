import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { useUIConfig } from '../UIConfigProvider';
import { formatNumber, formatNumberForEdit, parseLocalizedNumber } from '../utils/numberLocale';
import type { ValueMap, ValueMapExtended } from '../Slider/valueMap';
import { extendValueMap, changeByStep, snapToStep } from '../Slider/valueMap';
import { ButtonGroup, InputWrapper, NumberInputContainer, StepButton, StyledInput } from './NumberInput.styled';

export type LineType = 'outlined' | 'underlined' | 'borderless';

/**
 * Get the number of decimal places in a number
 */
const getDecimalPlaces = (num: number): number => {
  const str = String(num);
  const decimalIndex = str.indexOf('.');
  if (decimalIndex === -1) return 0;
  return str.length - decimalIndex - 1;
};

/**
 * Precision-safe addition to avoid floating point errors
 * e.g., 0.1 + 0.2 = 0.30000000000000004 -> 0.3
 */
const precisionAdd = (a: number, b: number): number => {
  const precision = Math.max(getDecimalPlaces(a), getDecimalPlaces(b));
  const multiplier = Math.pow(10, precision);
  return Math.round(a * multiplier + b * multiplier) / multiplier;
};

/**
 * Precision-safe subtraction to avoid floating point errors
 * e.g., 0.11 - 0.1 = 0.009999999999999998 -> 0.01
 */
const precisionSubtract = (a: number, b: number): number => {
  const precision = Math.max(getDecimalPlaces(a), getDecimalPlaces(b));
  const multiplier = Math.pow(10, precision);
  return Math.round(a * multiplier - b * multiplier) / multiplier;
};

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
   * Unit text to display after the input
   */
  unit?: string;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Whether to show step buttons (increment/decrement)
   * @default true
   */
  showStepButtons?: boolean;
  /**
   * Trigger mode for showing step buttons
   * - 'normal': always show (default)
   * - 'hover': show only on hover
   * @default 'normal'
   */
  showStepButtonsTrigger?: 'hover' | 'normal';
  /**
   * Input line type
   * - 'outlined': with full border (default)
   * - 'underlined': with bottom border only
   * - 'borderless': no border
   * @default 'outlined'
   */
  lineType?: LineType;
  /**
   * Whether to use thousands separator in display
   * @default false
   */
  useThousandsSeparator?: boolean;
  /**
   * Value map for piecewise linear mapping (non-linear stepping)
   * When provided, min/max/step props are ignored
   */
  valueMap?: ValueMap;
  /**
   * Callback when value changes
   * @param fixedValue - The clamped value within min/max range (can be undefined if empty)
   * @param rawValue - The original input value before clamping (can be undefined if empty)
   */
  onChange?: (fixedValue: number | undefined, rawValue: number | undefined) => void;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Custom style
   */
  style?: React.CSSProperties;
  /**
   * Callback when input receives focus
   */
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * Callback when input loses focus
   */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * Callback when input value changes during typing
   * Useful for real-time validation (e.g., check if value is multiple of 3)
   * @param inputValue - The raw input string
   * @param parsedValue - The parsed number value (undefined if invalid)
   */
  onInputChange?: (inputValue: string, parsedValue: number | undefined) => void;
  /**
   * Whether to select all text when the input receives focus
   * @default false
   */
  selectAllOnFocus?: boolean;
  /**
   * Whether to blur the input when Escape key is pressed
   * @default true
   */
  blurOnEscape?: boolean;
}


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
  defaultValue,
  min = -Infinity,
  max = Infinity,
  step = 1,
  size = 'large',
  disabled = false,
  alert = false,
  precision,
  formatter,
  parser,
  unit,
  placeholder,
  showStepButtons = true,
  showStepButtonsTrigger = 'normal',
  lineType = 'outlined',
  useThousandsSeparator = false,
  valueMap: valueMapProp,
  onChange,
  className,
  style,
  onFocus: onFocusProp,
  onBlur: onBlurProp,
  onInputChange,
  selectAllOnFocus = false,
  blurOnEscape = true,
}) => {
  const config = useUIConfig();
  const locale = config?.locale ?? 'en-US';

  const [internalValue, setInternalValue] = useState<number | undefined>(controlledValue ?? defaultValue);
  const [displayValue, setDisplayValue] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  // Create extended value map when valueMap is provided
  const extendedValueMap: ValueMapExtended | undefined = useMemo(() => {
    if (!valueMapProp) return undefined;
    return extendValueMap(valueMapProp);
  }, [valueMapProp]);

  // Derive effective min/max from value map or props
  const effectiveMin = extendedValueMap ? extendedValueMap.start : min;
  const effectiveMax = extendedValueMap ? extendedValueMap.end : max;

  // Format value for display (optionally with thousands separator and unit)
  const formatValue = useCallback(
    (val: number | undefined): string => {
      if (val === undefined) {
        return '';
      }
      let formatted: string;
      if (formatter) {
        formatted = formatter(val);
      } else if (useThousandsSeparator) {
        formatted = formatNumber(val, locale, precision);
      } else {
        formatted = formatNumberForEdit(val, locale, precision);
      }
      // Append unit directly to the number for display
      if (unit) {
        return formatted + unit;
      }
      return formatted;
    },
    [formatter, precision, locale, useThousandsSeparator, unit]
  );

  // Format value for editing (without thousands separator, for easier input)
  const formatValueForEdit = useCallback(
    (val: number | undefined): string => {
      if (val === undefined) {
        return '';
      }
      if (formatter) {
        return formatter(val);
      }
      return formatNumberForEdit(val, locale, precision);
    },
    [formatter, precision, locale]
  );

  // Parse display value to number (handles locale-specific separators)
  const parseValue = useCallback(
    (displayVal: string): number | null => {
      if (parser) {
        return parser(displayVal);
      }
      return parseLocalizedNumber(displayVal, locale);
    },
    [parser, locale]
  );

  // Update display value when value changes
  useEffect(() => {
    if (!isFocused) {
      setDisplayValue(formatValue(value));
    }
  }, [value, isFocused, formatValue]);

  // Apply precision to a value (rounds to specified decimal places)
  const applyPrecision = useCallback(
    (val: number | undefined): number | undefined => {
      if (val === undefined || precision === undefined) {
        return val;
      }
      // Use toFixed and parseFloat to round to precision
      // This ensures 0.006 with precision=2 becomes 0.01
      const multiplier = Math.pow(10, precision);
      return Math.round(val * multiplier) / multiplier;
    },
    [precision]
  );

  // Clamp value to min/max
  const clampValue = useCallback(
    (val: number | undefined): number | undefined => {
      if (val === undefined) {
        return undefined;
      }
      return Math.max(effectiveMin, Math.min(effectiveMax, val));
    },
    [effectiveMin, effectiveMax]
  );

  // Handle value change
  const handleValueChange = useCallback(
    (newValue: number | undefined) => {
      const clampedValue = clampValue(newValue);

      if (controlledValue === undefined) {
        setInternalValue(clampedValue);
      }

      onChange?.(clampedValue, newValue);
    },
    [clampValue, controlledValue, onChange]
  );

  // Increment value
  const increment = useCallback(() => {
    if (disabled) return;
    const currentValue = value ?? 0;
    const newValue = extendedValueMap
      ? changeByStep(currentValue, 1, extendedValueMap)
      : precisionAdd(currentValue, step);
    handleValueChange(newValue);
    // If focused, sync displayValue immediately (use edit format without thousands separator)
    if (isFocused) {
      const clampedValue = clampValue(newValue);
      setDisplayValue(formatValueForEdit(clampedValue));
    }
  }, [disabled, value, step, handleValueChange, isFocused, clampValue, formatValueForEdit, extendedValueMap]);

  // Decrement value
  const decrement = useCallback(() => {
    if (disabled) return;
    const currentValue = value ?? 0;
    const newValue = extendedValueMap
      ? changeByStep(currentValue, -1, extendedValueMap)
      : precisionSubtract(currentValue, step);
    handleValueChange(newValue);
    // If focused, sync displayValue immediately (use edit format without thousands separator)
    if (isFocused) {
      const clampedValue = clampValue(newValue);
      setDisplayValue(formatValueForEdit(clampedValue));
    }
  }, [disabled, value, step, handleValueChange, isFocused, clampValue, formatValueForEdit, extendedValueMap]);

  // Handle input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setDisplayValue(inputValue);

      // Parse and call onInputChange callback
      const trimmed = inputValue.trim();
      const parsedValue = trimmed === '' ? undefined : (parseValue(trimmed) ?? undefined);
      onInputChange?.(inputValue, parsedValue);
    },
    [parseValue, onInputChange]
  );

  // Handle input blur
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      const trimmedValue = displayValue.trim();
      if (trimmedValue === '') {
        handleValueChange(undefined);
        setDisplayValue('');
      } else {
        const parsed = parseValue(trimmedValue);
        if (parsed !== null) {
          // Apply precision to ensure stored value matches displayed value
          const preciseValue = applyPrecision(parsed);
          // Snap to step when valueMap is provided
          const finalValue = extendedValueMap && preciseValue !== undefined
            ? snapToStep(preciseValue, extendedValueMap)
            : preciseValue;
          handleValueChange(finalValue);
        } else {
          setDisplayValue(formatValue(value));
        }
      }
      onBlurProp?.(e);
    },
    [displayValue, parseValue, handleValueChange, value, formatValue, applyPrecision, onBlurProp, extendedValueMap]
  );

  // Handle input focus
  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      // Use edit format (without thousands separator) for easier editing
      setDisplayValue(formatValueForEdit(value));
      if (selectAllOnFocus) {
        // Use requestAnimationFrame to select after React updates the display value
        requestAnimationFrame(() => {
          inputRef.current?.select();
        });
      }
      onFocusProp?.(e);
    },
    [value, formatValueForEdit, onFocusProp, selectAllOnFocus]
  );

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
      } else if (e.key === 'Escape' && blurOnEscape) {
        inputRef.current?.blur();
      }
    },
    [increment, decrement, blurOnEscape]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <NumberInputContainer
      $size={size}
      $disabled={disabled}
      $alert={alert}
      $isFocused={isFocused}
      $lineType={lineType}
      className={className}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
          placeholder={placeholder}
          $size={size}
          $disabled={disabled}
        />
      </InputWrapper>

      {showStepButtons && (showStepButtonsTrigger !== 'hover' || isHovered || isFocused) && (
        <ButtonGroup $alert={alert} $disabled={disabled} $lineType={lineType}>
          <StepButton
            type="button"
            $disabled={disabled}
            onClick={increment}
            disabled={disabled}
            tabIndex={-1}
          >
            <UpArrow />
          </StepButton>

          <StepButton
            type="button"
            $disabled={disabled}
            onClick={decrement}
            disabled={disabled}
            tabIndex={-1}
          >
            <DownArrow />
          </StepButton>
        </ButtonGroup>
      )}
    </NumberInputContainer>
  );
};

NumberInput.displayName = 'NumberInput';
