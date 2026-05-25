import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { styled } from '../utils/styled';
import type { ValueMap, ValueMapExtended } from './valueMap';
import {
  extendValueMap,
  createSinglePiecewiseMap,
  valueToVisualPercentage,
  visualPercentToValue,
  snapToStep,
  changeByStep,
} from './valueMap';

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
   * Slider direction
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * Value map for piecewise linear mapping (non-linear slider)
   * When provided, min/max/step props are ignored
   */
  valueMap?: ValueMap;
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
  $direction: 'horizontal' | 'vertical';
}>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ $direction }) =>
    $direction === 'vertical'
      ? `
        width: 18px;
        height: 100%;
        flex: 1;
        flex-direction: column;
      `
      : `
        width: 100%;
        height: 18px;
        flex-direction: row;
      `}
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  user-select: none;
`;

const SliderTrack = styled.div<{
  $disabled: boolean;
  $direction: 'horizontal' | 'vertical';
}>`
  position: absolute;
  background: ${({ theme }) => theme.colors.palettes.transparency['20']};
  border-radius: 1000px;
  ${({ $direction, theme }) => {
    const thumbSize = theme.components.slider.large.thumbSize;

    return $direction === 'vertical'
      ? `
        top: 50%;
        width: ${theme.components.slider.track.height};
        height: calc(100% - ${thumbSize});
        left: 50%;
        transform: translate(-50%, -50%);
      `
      : `
        left: 50%;
        width: calc(100% - ${thumbSize});
        height: ${theme.components.slider.track.height};
        top: 50%;
        transform: translate(-50%, -50%);
      `;
  }}
`;

const SliderFill = styled.div<{
  $percentage: number;
  $disabled: boolean;
  $direction: 'horizontal' | 'vertical';
}>`
  position: absolute;
  border-radius: ${({ theme }) => theme.components.slider.track.borderRadius};
  background: ${({ $disabled, theme }) =>
    $disabled
      ? theme.components.slider.track.filledBackgroundDisabled
      : theme.components.slider.track.filledBackground};
  ${({ $direction, $percentage, theme }) => {
    const thumbSize = theme.components.slider.large.thumbSize;

    return $direction === 'vertical'
      ? `
        bottom: calc(${thumbSize} / 2);
        width: ${theme.components.slider.track.height};
        left: 50%;
        transform: translateX(-50%);
        height: calc((100% - ${thumbSize}) * ${$percentage / 100});
      `
      : `
        left: calc(${thumbSize} / 2);
        height: ${theme.components.slider.track.height};
        top: 50%;
        transform: translateY(-50%);
        width: calc((100% - ${thumbSize}) * ${$percentage / 100});
      `;
  }}
`;

const SliderThumb = styled.div<{
  $percentage: number;
  $disabled: boolean;
  $isDragging: boolean;
  $direction: 'horizontal' | 'vertical';
}>`
  position: absolute;
  width: ${({ theme }) => theme.components.slider.large.thumbSize};
  height: ${({ theme }) => theme.components.slider.large.thumbSize};
  border-radius: 50%;
  background: ${({ $disabled, theme }) =>
    $disabled
      ? theme.components.slider.thumb.backgroundDisabled
      : theme.components.slider.thumb.background};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'grab')};
  box-shadow: ${({ theme }) => theme.components.slider.thumb.boxShadow};
  ${({ $direction, $percentage, $isDragging, theme }) => {
    const thumbSize = theme.components.slider.large.thumbSize;

    return $direction === 'vertical'
      ? `
        bottom: calc((100% - ${thumbSize}) * ${$percentage / 100} + ${thumbSize} / 2);
        left: 50%;
        transform: translate(-50%, 50%);
        transition: ${$isDragging ? 'none' : 'bottom 0.1s ease'};
      `
      : `
        left: calc((100% - ${thumbSize}) * ${$percentage / 100} + ${thumbSize} / 2);
        top: 50%;
        transform: translate(-50%, -50%);
        transition: ${$isDragging ? 'none' : 'left 0.1s ease'};
      `;
  }}

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
  direction = 'horizontal',
  valueMap: valueMapProp,
  onChange,
  onDragStart,
  onDragEnd,
  className,
  style,
}) => {
  // Create extended value map
  const extendedValueMap: ValueMapExtended = useMemo(() => {
    if (valueMapProp) {
      return extendValueMap(valueMapProp);
    }
    return extendValueMap(createSinglePiecewiseMap(min, max, step));
  }, [valueMapProp, min, max, step]);

  // Get effective min/max from value map
  const effectiveMin = extendedValueMap.start;
  const effectiveMax = extendedValueMap.end;

  const [internalValue, setInternalValue] = useState<number>(controlledValue ?? defaultValue);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  // Calculate percentage using value map
  const percentage = valueToVisualPercentage(value, extendedValueMap) * 100;

  // Update value based on position
  const updateValue = useCallback(
    (clientX: number, clientY: number) => {
      if (!containerRef.current || disabled) return;

      const rect = containerRef.current.getBoundingClientRect();
      const thumbRect = thumbRef.current?.getBoundingClientRect();
      const thumbLength = direction === 'vertical' ? thumbRect?.height ?? 0 : thumbRect?.width ?? 0;
      const containerLength = direction === 'vertical' ? rect.height : rect.width;
      const trackLength = Math.max(containerLength - thumbLength, 0);
      let visualPercent: number;

      if (direction === 'vertical') {
        // Vertical: from bottom (0%) to top (100%)
        const offsetY = rect.bottom - clientY - thumbLength / 2;
        visualPercent = trackLength === 0 ? 0 : Math.max(0, Math.min(1, offsetY / trackLength));
      } else {
        // Horizontal: from left (0%) to right (100%)
        const offsetX = clientX - rect.left - thumbLength / 2;
        visualPercent = trackLength === 0 ? 0 : Math.max(0, Math.min(1, offsetX / trackLength));
      }

      // Convert visual percent to value and snap to step
      const rawValue = visualPercentToValue(visualPercent, extendedValueMap);
      const snappedValue = snapToStep(rawValue, extendedValueMap);

      if (controlledValue === undefined) {
        setInternalValue(snappedValue);
      }

      onChange?.(snappedValue);
    },
    [disabled, controlledValue, onChange, direction, extendedValueMap]
  );

  // Handle track click (jump to position without dragging)
  const handleTrackClick = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return;

      e.preventDefault();
      updateValue(e.clientX, e.clientY);
    },
    [disabled, updateValue]
  );

  // Handle thumb drag start
  const handleThumbMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return;

      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
      onDragStart?.();
    },
    [disabled, onDragStart]
  );

  // Handle mouse move
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      updateValue(e.clientX, e.clientY);
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
          newValue = changeByStep(value, -1, extendedValueMap);
          break;
        case 'ArrowRight':
        case 'ArrowUp':
          e.preventDefault();
          newValue = changeByStep(value, 1, extendedValueMap);
          break;
        case 'Home':
          e.preventDefault();
          newValue = effectiveMin;
          break;
        case 'End':
          e.preventDefault();
          newValue = effectiveMax;
          break;
        default:
          return;
      }

      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }

      onChange?.(newValue);
    },
    [disabled, value, effectiveMin, effectiveMax, controlledValue, onChange, extendedValueMap]
  );

  return (
    <SliderContainer
      ref={containerRef}
      $disabled={disabled}
      $direction={direction}
      className={className}
      style={style}
      onMouseDown={handleTrackClick}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      role="slider"
      aria-valuemin={effectiveMin}
      aria-valuemax={effectiveMax}
      aria-valuenow={value}
      aria-disabled={disabled}
      aria-orientation={direction}
    >
      <SliderTrack $disabled={disabled} $direction={direction} />
      <SliderFill $percentage={percentage} $disabled={disabled} $direction={direction} />
      <SliderThumb
        ref={thumbRef}
        $percentage={percentage}
        $disabled={disabled}
        $isDragging={isDragging}
        $direction={direction}
        onMouseDown={handleThumbMouseDown}
      />
    </SliderContainer>
  );
};

Slider.displayName = 'Slider';
