import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Slider } from '../Slider';
import { NumberInput } from '../NumberInput';

export interface SpinButtonProps {
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
   * Whether to show the slider
   */
  showSlider?: boolean;
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

const SpinButtonWrapper = styled.div<{
  $showSlider: boolean;
}>`
  display: inline-flex;
  align-items: center;
  gap: ${({ $showSlider }) => ($showSlider ? '0' : '0')};
  width: ${({ $showSlider }) => ($showSlider ? '100%' : 'auto')};
`;

const SliderWrapper = styled.div<{
  $size: 'small' | 'large';
}>`
  flex: 1;
  display: flex;
  align-items: center;
  padding: ${({ $size }) => ($size === 'small' ? '7px 0' : '7px 0')};
  padding-right: ${({ $size }) => ($size === 'small' ? '83px' : '72px')};
  min-width: 0;
`;


/**
 * SpinButton Component - Spin Button
 *
 * A numeric input with increment/decrement buttons
 *
 * @example
 * <SpinButton value={35} onChange={(val) => console.log(val)} />
 */
export const SpinButton: React.FC<SpinButtonProps> = ({
  value: controlledValue,
  defaultValue = 0,
  min = -Infinity,
  max = Infinity,
  step = 1,
  size = 'large',
  disabled = false,
  alert = false,
  showSlider = false,
  precision,
  formatter,
  parser,
  onChange,
  className,
  style,
}) => {
  const [internalValue, setInternalValue] = useState<number>(controlledValue ?? defaultValue);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  // Handle value change from NumberInput or Slider
  const handleValueChange = useCallback(
    (newValue: number | null) => {
      if (newValue === null) return;

      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }

      onChange?.(newValue);
    },
    [controlledValue, onChange]
  );

  return (
    <SpinButtonWrapper $showSlider={showSlider} className={className} style={style}>
      {showSlider && (
        <SliderWrapper $size={size}>
          <Slider
            value={value}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            onChange={handleValueChange}
          />
        </SliderWrapper>
      )}

      <NumberInput
        value={value}
        min={min}
        max={max}
        step={step}
        size={size}
        disabled={disabled}
        alert={alert}
        precision={precision}
        formatter={formatter}
        parser={parser}
        onChange={handleValueChange}
      />
    </SpinButtonWrapper>
  );
};

SpinButton.displayName = 'SpinButton';
