import React, { forwardRef, useState } from 'react';
import { styled } from '../utils/styled';
import { Icon } from '../Icon';
import { CloseIcon } from '@officesdk/design/icons';

type InputSize = 'mini' | 'small' | 'medium' | 'large';
type LineType = 'outlined' | 'underlined' | 'borderless';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  /**
   * Input line type
   */
  lineType?: LineType;
  /**
   * Input size
   */
  size?: InputSize;
  /**
   * Whether the input has an error state
   */
  error?: boolean;
  /**
   * Whether the input is in readonly mode
   */
  readOnly?: boolean;
  /**
   * Node to display before the input
   */
  prefixNode?: React.ReactNode;
  /**
   * Node to display after the input
   */
  suffixNode?: React.ReactNode;
  /**
   * Whether to show clear button when input has value
   */
  clearable?: boolean;
  /**
   * Clear button click handler
   */
  onClear?: () => void;
  /**
   * Custom clear icon
   */
  clearIcon?: React.ReactNode;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Custom inline styles
   */
  style?: React.CSSProperties;
  /**
   * Custom input className
   */
  inputClassName?: string;
  /**
   * Custom input styles
   */
  inputStyle?: React.CSSProperties;
}

const InputContainer = styled.div<{
  $size: InputSize;
  $lineType: LineType;
}>`
  display: inline-flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  position: relative;

  ${({ $size, $lineType, theme }) => {
    const size = $size || 'medium';
    const typeConfig =
      $lineType === 'underlined'
        ? theme.components?.input?.underlined
        : theme.components?.input?.outlined;
    const sizeConfig = typeConfig?.[size];
    if (!sizeConfig) return '';

    return `
      height: ${sizeConfig.height};
    `;
  }}
`;

const InputWrapper = styled.div<{
  $size: InputSize;
  $lineType: LineType;
  $error: boolean;
  $disabled: boolean;
  $readOnly: boolean;
  $isFocused: boolean;
}>`
  display: inline-flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  flex: 1;
  transition: all 0.2s ease;

  ${({ $size, $lineType, theme }) => {
    const size = $size || 'medium';
    const typeConfig =
      $lineType === 'underlined'
        ? theme.components?.input?.underlined
        : theme.components?.input?.outlined;
    const sizeConfig = typeConfig?.[size];
    if (!sizeConfig) return '';

    return `
      height: ${sizeConfig.height};
      padding: ${sizeConfig.padding};
      gap: ${sizeConfig.gap || '4px'};
      ${
        $lineType === 'outlined'
          ? `
        border-radius: ${sizeConfig.borderRadius};
      `
          : ''
      }
    `;
  }}

  ${({ $error, $disabled, $readOnly, $isFocused, $lineType, theme, $size }) => {
    const typeConfig =
      $lineType === 'underlined'
        ? theme.components?.input?.underlined
        : theme.components?.input?.outlined;
    const stateConfig = typeConfig?.state;
    if (!stateConfig) return '';

    let borderColor = stateConfig.borderColor;
    let background = stateConfig.background;
    let boxShadow = 'none';

    if ($disabled) {
      borderColor = stateConfig.borderColorDisabled;
      background = stateConfig.backgroundDisabled;
    } else if ($readOnly) {
      borderColor = stateConfig.borderColorReadonly || stateConfig.borderColor;
      background = stateConfig.backgroundReadonly || stateConfig.background;
    } else if ($error) {
      borderColor = stateConfig.borderColorError;
      background = $lineType === 'outlined' ? stateConfig.backgroundActive : stateConfig.background;
    } else if ($isFocused) {
      borderColor = stateConfig.borderColorActive;
      background = stateConfig.backgroundActive;
      if ($lineType === 'outlined') {
        const size = $size || 'medium';
        const sizeConfig = typeConfig?.[size];
        boxShadow = sizeConfig?.boxShadowActive || 'none';
      }
    }

    if ($lineType === 'borderless') {
      // borderless type: no border, no boxShadow
      return `
        border: none;
        background: transparent;
        box-shadow: none;

        &:hover:not(:disabled) {
          background: transparent;
        }
      `;
    } else if ($lineType === 'outlined') {
      return `
        border: 1px solid ${borderColor};
        background: ${background};
        box-shadow: ${boxShadow};

        &:hover:not(:disabled) {
          ${
            !$disabled && !$readOnly && !$isFocused
              ? `
            border-color: ${stateConfig.borderColorHover};
            background: ${stateConfig.backgroundHover};
          `
              : ''
          }
        }
      `;
    } else {
      // underlined type
      return `
        background: ${background};
        border-bottom: 1px solid ${$error ? borderColor : $isFocused ? borderColor : 'transparent'};

        &:hover:not(:disabled) {
          ${
            !$disabled && !$isFocused && !$error
              ? `
            border-bottom-color: ${stateConfig.borderColorHover};
          `
              : ''
          }
        }
      `;
    }
  }}

  ${({ $disabled }) =>
    $disabled &&
    `
    cursor: not-allowed;
    opacity: ${$disabled ? '0.6' : '1'};
  `}
`;

const ContentBlock = styled.div<{
  $size: InputSize;
  $lineType: LineType;
}>`
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;

  ${({ $size, $lineType, theme }) => {
    const size = $size || 'medium';
    const typeConfig =
      $lineType === 'underlined'
        ? theme.components?.input?.underlined
        : theme.components?.input?.outlined;
    const sizeConfig = typeConfig?.[size];
    if (!sizeConfig) return '';

    return `
      padding: ${sizeConfig.contentPadding || '0'};
      gap: ${sizeConfig.gap || '4px'};
    `;
  }}
`;

const StyledInput = styled.input<{
  $size: InputSize;
  $lineType: LineType;
  $disabled: boolean;
  $readOnly: boolean;
  $isFocused: boolean;
}>`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  min-width: 0;
  padding: 0;
  margin: 0;
  font-family: inherit;

  ${({ $size, $lineType, $disabled, theme }) => {
    const size = $size || 'medium';
    const typeConfig =
      $lineType === 'underlined'
        ? theme.components?.input?.underlined
        : theme.components?.input?.outlined;
    const sizeConfig = typeConfig?.[size];
    const stateConfig = typeConfig?.state;
    if (!sizeConfig || !stateConfig) return '';

    // textColorNormal is used for all states except disabled
    const textColor = $disabled ? stateConfig.textColorDisabled : stateConfig.textColorNormal;

    return `
      font-size: ${sizeConfig.fontSize};
      line-height: ${sizeConfig.lineHeight};
      color: ${textColor};
    `;
  }}

  &::placeholder {
    color: ${({ $isFocused, $lineType, theme }) => {
      const typeConfig =
        $lineType === 'underlined'
          ? theme.components?.input?.underlined
          : theme.components?.input?.outlined;
      const stateConfig = typeConfig?.state;
      return $isFocused
        ? stateConfig?.placeholderColorHover || 'rgba(65, 70, 75, 0.3)'
        : stateConfig?.placeholderColorNormal || 'rgba(65, 70, 75, 0.3)';
    }};
  }

  ${({ $disabled }) =>
    $disabled &&
    `
    cursor: not-allowed;
  `}

  ${({ $readOnly }) =>
    $readOnly &&
    `
    cursor: default;
  `}
`;

const PrefixNode = styled.div<{ $size: InputSize; $lineType: LineType }>`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;

  ${({ $size, $lineType, theme }) => {
    const size = $size || 'medium';
    const typeConfig =
      $lineType === 'underlined'
        ? theme.components?.input?.underlined
        : theme.components?.input?.outlined;
    const sizeConfig = typeConfig?.[size];
    if (!sizeConfig) return '';

    return `
      svg, img {
        width: ${sizeConfig.iconSize.width};
        height: ${sizeConfig.iconSize.height};
      }
    `;
  }}
`;

const SuffixNode = styled.div<{ $size: InputSize; $lineType: LineType }>`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;

  ${({ $size, $lineType, theme }) => {
    const size = $size || 'medium';
    const typeConfig =
      $lineType === 'underlined'
        ? theme.components?.input?.underlined
        : theme.components?.input?.outlined;
    const sizeConfig = typeConfig?.[size];
    if (!sizeConfig) return '';

    return `
      svg, img {
        width: ${sizeConfig.iconSize.width};
        height: ${sizeConfig.iconSize.height};
      }
    `;
  }}
`;

const ClearButton = styled.button<{ $size: InputSize; $lineType: LineType }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  margin: 0;
  outline: none;
  transition: opacity 0.2s ease;

  ${({ $size, $lineType, theme }) => {
    const size = $size || 'medium';
    const typeConfig =
      $lineType === 'underlined'
        ? theme.components?.input?.underlined
        : theme.components?.input?.outlined;
    const sizeConfig = typeConfig?.[size];
    const clearIconSize = sizeConfig?.clearIcon?.size;
    if (!clearIconSize) return '';

    return `
      width: ${clearIconSize.width};
      height: ${clearIconSize.height};

      svg {
        width: ${clearIconSize.width};
        height: ${clearIconSize.height};
      }
    `;
  }}

  &:hover {
    opacity: 0.7;
  }

  &:active {
    opacity: 0.5;
  }
`;

const AlertLine = styled.div`
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 1px;
  background-color: ${({ theme }) => theme.colors?.palettes?.red?.['6'] || '#E95555'};
`;

/**
 * Input Component
 *
 * @example
 * // Basic outlined input (default)
 * <Input placeholder="Enter text" />
 *
 * @example
 * // Underlined input
 * <Input lineType="underlined" placeholder="Enter text" />
 *
 * @example
 * // Input with prefix and suffix
 * <Input prefixNode={<SearchIcon />} suffixNode={<Icon />} />
 *
 * @example
 * // Input with clearable
 * <Input clearable onClear={() => console.log('cleared')} />
 *
 * @example
 * // Input with error state
 * <Input error placeholder="Enter text" />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      lineType = 'outlined',
      size = 'medium',
      error = false,
      disabled = false,
      readOnly = false,
      prefixNode,
      suffixNode,
      clearable = false,
      onClear,
      clearIcon,
      className,
      style,
      inputClassName,
      inputStyle,
      onFocus,
      onBlur,
      value,
      onChange,
      defaultValue,
      ...rest
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(
      value !== undefined ? value : (defaultValue as string) || ''
    );

    // Controlled vs Uncontrolled
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const hasValue = !!currentValue && String(currentValue).length > 0;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (!isControlled) {
        setInternalValue('');
      }

      // Trigger onChange event for controlled components
      if (onChange && ref && 'current' in ref && ref.current) {
        const syntheticEvent = {
          target: { ...ref.current, value: '' },
          currentTarget: ref.current,
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }

      onClear?.();
    };

    // Show clear button when clearable and has value
    const shouldShowClearButton = clearable && hasValue && !disabled && !readOnly;
    const clearButtonNode = shouldShowClearButton ? (
      <ClearButton
        type="button"
        $size={size}
        $lineType={lineType}
        onClick={handleClear}
        aria-label="Clear"
        tabIndex={-1}
      >
        {clearIcon || (
          <Icon size={16} color="rgba(65, 70, 75, 0.6)">
            <CloseIcon />
          </Icon>
        )}
      </ClearButton>
    ) : null;

    return (
      <InputContainer $size={size} $lineType={lineType} className={className} style={style}>
        <InputWrapper
          $size={size}
          $lineType={lineType}
          $error={error}
          $disabled={!!disabled}
          $readOnly={!!readOnly}
          $isFocused={isFocused}
        >
          {prefixNode && (
            <PrefixNode $size={size} $lineType={lineType}>
              {prefixNode}
            </PrefixNode>
          )}
          <ContentBlock $size={size} $lineType={lineType}>
            <StyledInput
              ref={ref}
              $size={size}
              $lineType={lineType}
              $disabled={!!disabled}
              $readOnly={!!readOnly}
              $isFocused={isFocused}
              disabled={disabled}
              readOnly={readOnly}
              value={currentValue}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={inputClassName}
              style={inputStyle}
              {...rest}
            />
            {clearButtonNode}
          </ContentBlock>
          {suffixNode && (
            <SuffixNode $size={size} $lineType={lineType}>
              {suffixNode}
            </SuffixNode>
          )}
        </InputWrapper>
        {lineType === 'underlined' && error && <AlertLine />}
      </InputContainer>
    );
  }
);

Input.displayName = 'Input';
