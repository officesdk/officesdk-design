import React, { useState, useCallback, useRef, useEffect } from 'react';
import { styled } from '../utils/styled';

export interface SliderProps {
  /**
   * Current value (0-100)
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
   * Step increment
   */
  step?: number;
  /**
   * Whether the slider is disabled
   */
  disabled?: boolean;
  /**
   * Callback when value changes
   */
  onChange?: (value: number) => void;
  /**
   * Callback when dragging starts
   */
  onDragStart?: () => void;
  /**
   * Callback when dragging ends
   */
  onDragEnd?: () => void;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Custom style
   */
  style?: React.CSSProperties;
}

const SliderContainer = styled.div<{
  $disabled: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 18px;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  user-select: none;
`;

const SliderTrack = styled.div<{
  $disabled: boolean;
}>`
  position: absolute;
  left: 0;
  right: 0;
  height: ${({ theme }) => theme.components.slider.track.height};
  background: ${({ theme }) => theme.colors.palettes.transparency['20']};
  border-radius: 1000px;
  top: 50%;
  transform: translateY(-50%);
`;

const SliderFill = styled.div<{
  $percentage: number;
  $disabled: boolean;
}>`
  position: absolute;
  left: 0;
  height: ${({ theme }) => theme.components.slider.track.height};
  border-radius: ${({ theme }) => theme.components.slider.track.borderRadius};
  top: 50%;
  transform: translateY(-50%);
  width: ${({ $percentage }) => $percentage}%;
  background: ${({ $disabled, theme }) =>
    $disabled
      ? theme.components.slider.track.filledBackgroundDisabled
      : theme.components.slider.track.filledBackground};
`;

const SliderThumb = styled.div<{
  $percentage: number;
  $disabled: boolean;
  $isDragging: boolean;
}>`
  position: absolute;
  width: ${({ theme }) => theme.components.slider.large.thumbSize};
  height: ${({ theme }) => theme.components.slider.large.thumbSize};
  border-radius: 50%;
  background: ${({ $disabled, theme }) =>
    $disabled ? theme.components.slider.thumb.backgroundDisabled : theme.components.slider.thumb.background};
  left: ${({ $percentage }) => $percentage}%;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'grab')};
  transition: ${({ $isDragging }) => ($isDragging ? 'none' : 'left 0.1s ease')};
  box-shadow: ${({ theme }) => theme.components.slider.thumb.boxShadow};

  ${({ $disabled, theme }) =>
    !$disabled &&
    `
    &:hover {
      box-shadow: ${theme.components.slider.thumb.boxShadowHover};
    }

    &:active {
      cursor: grabbing;
      box-shadow: ${theme.components.slider.thumb.boxShadowActive};
    }
  `}
`;

/**
 * Slider Component
 *
 * A slider for selecting a value from a range
 *
 * @example
 * <Slider value={35} onChange={(val) => console.log(val)} />
 */
export const Slider: React.FC<SliderProps> = ({
  value: controlledValue,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  onChange,
  onDragStart,
  onDragEnd,
  className,
  style,
}) => {
  const [internalValue, setInternalValue] = useState<number>(
    controlledValue ?? defaultValue
  );
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  // Calculate percentage
  const percentage = ((value - min) / (max - min)) * 100;

  // Update value based on position
  const updateValue = useCallback(
    (clientX: number) => {
      if (!containerRef.current || disabled) return;

      const rect = containerRef.current.getBoundingClientRect();
      const offsetX = clientX - rect.left;
      const newPercentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
      const rawValue = (newPercentage / 100) * (max - min) + min;

      // Apply step
      const steppedValue = Math.round(rawValue / step) * step;
      const clampedValue = Math.max(min, Math.min(max, steppedValue));

      if (controlledValue === undefined) {
        setInternalValue(clampedValue);
      }

      onChange?.(clampedValue);
    },
    [min, max, step, disabled, controlledValue, onChange]
  );

  // Handle mouse down
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return;

      e.preventDefault();
      setIsDragging(true);
      onDragStart?.();
      updateValue(e.clientX);
    },
    [disabled, onDragStart, updateValue]
  );

  // Handle mouse move
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      updateValue(e.clientX);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      onDragEnd?.();
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, updateValue, onDragEnd]);

  // Handle keyboard events
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;

      let newValue = value;

      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowDown':
          e.preventDefault();
          newValue = Math.max(min, value - step);
          break;
        case 'ArrowRight':
        case 'ArrowUp':
          e.preventDefault();
          newValue = Math.min(max, value + step);
          break;
        case 'Home':
          e.preventDefault();
          newValue = min;
          break;
        case 'End':
          e.preventDefault();
          newValue = max;
          break;
        default:
          return;
      }

      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }

      onChange?.(newValue);
    },
    [disabled, value, min, max, step, controlledValue, onChange]
  );

  return (
    <SliderContainer
      ref={containerRef}
      $disabled={disabled}
      className={className}
      style={style}
      onMouseDown={handleMouseDown}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-disabled={disabled}
    >
      <SliderTrack $disabled={disabled} />
      <SliderFill $percentage={percentage} $disabled={disabled} />
      <SliderThumb
        $percentage={percentage}
        $disabled={disabled}
        $isDragging={isDragging}
      />
    </SliderContainer>
  );
};

Slider.displayName = 'Slider';

