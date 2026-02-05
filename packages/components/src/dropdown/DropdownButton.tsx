import React, { forwardRef } from 'react';
import { styled } from '../utils/styled';
import { Icon } from '../Icon';
import { ArrowRightIcon } from '@officesdk/design/icons';

type DropdownButtonSize = 'large' | 'medium' | 'small';
type DropdownButtonVariant = 'framed' | 'frameless';

export interface DropdownButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /**
   * Button variant
   * - framed: with border (40px large)
   * - frameless: without border (28px medium)
   */
  variant?: DropdownButtonVariant;
  /**
   * Button size
   */
  size?: DropdownButtonSize;
  /**
   * Display value/label
   */
  value?: string;
  /**
   * Placeholder when no value
   */
  placeholder?: string;
  /**
   * Optional icon (URL string or ReactNode)
   */
  icon?: string | React.ReactNode;
  /**
   * Custom indicator/arrow icon
   */
  indicatorIcon?: React.ReactNode;
  /**
   * Whether the dropdown is open (controls arrow rotation)
   */
  open?: boolean;
  /**
   * Whether the button is disabled
   */
  disabled?: boolean;
  /**
   * Error state
   */
  error?: boolean;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Custom style
   */
  style?: React.CSSProperties;

  /**
   * Custom text style
   */
  textStyle?: React.CSSProperties;

  /**
   * Custom content to render instead of value/placeholder
   * When provided, value and placeholder are ignored
   */
  children?: React.ReactNode;
}

const DropdownButtonContainer = styled.button<{
  $variant: DropdownButtonVariant;
  $size: DropdownButtonSize;
  $disabled: boolean;
  $open: boolean;
  $error: boolean;
}>`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  border: none;
  outline: none;
  box-sizing: border-box;
  transition: all 0.2s ease;
  font-family: 'PingFang SC', sans-serif;
  width: 100%;

  ${({ $size, theme }) => {
    const config = theme.components?.dropdownButton;
    const sizeConfig = config?.size?.[$size];
    if (!sizeConfig) return '';

    return `
      height: ${sizeConfig.height};
      padding: ${sizeConfig.padding};
      gap: ${sizeConfig.gap};
      font-size: ${sizeConfig.fontSize};
      border-radius: ${sizeConfig.borderRadius};
    `;
  }}

  ${({ $variant, $disabled, $error, theme }) => {
    const config = theme.components?.dropdownButton;
    if (!config) return '';

    // Background
    let background = config.background.normal;
    if ($disabled) {
      background =
        $variant === 'frameless' ? config.frameLessBackground.disabled : config.background.disabled;
    } else if ($variant === 'frameless') {
      background = config.frameLessBackground.normal;
    }

    // Border for framed variant
    let border = 'none';

    if ($variant === 'framed') {
      const borderColor = $disabled
        ? config.borderColor.disabled
        : $error
        ? config.borderColor.error
        : config.borderColor.normal;
      border = `1px solid ${borderColor}`;
    }

    // Text color
    const color = $disabled ? config.color.disabled : config.color.normal;

    return `
      background: ${background};
      border: ${border};
      color: ${color};

      &:hover:not(:disabled) {
        background: ${
          $variant === 'frameless' ? config.frameLessBackground.hover : config.background.hover
        };
        color: ${config.color.hover};
        ${
          $variant === 'framed'
            ? `
          border-color: ${$error ? config.borderColor.error : config.borderColor.hover};
        `
            : ''
        }
      }

      &:active:not(:disabled) {
        background: ${
          $variant === 'frameless' ? config.frameLessBackground.active : config.background.active
        };
        color: ${config.color.active};
        ${
          $variant === 'framed'
            ? `
          border-color: ${$error ? config.borderColor.error : config.borderColor.active};
        `
            : ''
        }
      }
    `;
  }}

  ${({ $disabled }) =>
    $disabled &&
    `
    cursor: not-allowed;
  `}
`;

const IconWrapper = styled.div<{ $size: DropdownButtonSize }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  ${({ $size, theme }) => {
    const config = theme.components?.dropdownButton;
    const sizeConfig = config?.size?.[$size];
    if (!sizeConfig) return '';

    return `
      width: ${sizeConfig.iconSize.width};
      height: ${sizeConfig.iconSize.height};

      svg, img {
        width: ${sizeConfig.iconSize.width};
        height: ${sizeConfig.iconSize.height};
      }
    `;
  }}

  ${({ theme }) => {
    const config = theme.components?.dropdownButton;
    return `
      color: ${config?.color?.normal || '#41464b'};
    `;
  }}
`;

const TextContent = styled.div<{ $disabled: boolean; $hasValue: boolean }>`
  flex: 1;
  min-width: 0; /* Important: allows flex item to shrink below content size */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  line-height: 20px;

  ${({ $hasValue, $disabled, theme }) => {
    const config = theme.components?.dropdownButton;
    const color = $disabled ? config?.color?.disabled : config?.color?.normal;

    return `
      color: ${color};
      ${!$hasValue ? `opacity: 0.3;` : ''}
    `;
  }}
`;

const IndicatorWrapper = styled.div<{
  $size: DropdownButtonSize;
  $open: boolean;
  $disabled: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.2s ease;

  ${({ $size, theme }) => {
    const config = theme.components?.dropdownButton;
    const sizeConfig = config?.size?.[$size];
    if (!sizeConfig) return '';

    return `
      width: ${sizeConfig.indicatorSize.width};
      height: ${sizeConfig.indicatorSize.height};
    `;
  }}

  ${({ $open, theme }) => {
    const config = theme.components?.dropdownButton?.indicator;
    const rotate = config?.rotate || '90deg';

    return `
      transform: rotate(${$open ? rotate : 0});
    `;
  }}

  ${({ $disabled, theme }) => {
    const config = theme.components?.dropdownButton?.indicator?.opacity;
    const opacity = $disabled ? config?.disabled || '0.3' : config?.normal || '1';

    return `
      opacity: ${opacity};
      color: ${theme.components?.dropdownButton?.color?.normal || '#41464b'};
    `;
  }}
`;

/**
 * DropdownButton Component
 *
 * A button component for triggering dropdown menus
 *
 * @example
 * // Framed dropdown button (with border, 40px)
 * <DropdownButton variant="framed" value="Option 1" />
 *
 * @example
 * // Frameless dropdown button (no border, 28px)
 * <DropdownButton variant="frameless" value="Option 1" />
 *
 * @example
 * // With icon
 * <DropdownButton icon={<CustomIcon />} value="Option 1" />
 *
 * @example
 * // Open state (arrow rotated)
 * <DropdownButton open value="Option 1" />
 */
export const DropdownButton = forwardRef<HTMLButtonElement, DropdownButtonProps>(
  (
    {
      variant = 'framed',
      size,
      value,
      placeholder = 'Select...',
      icon,
      indicatorIcon,
      open = false,
      disabled = false,
      error = false,
      className,
      style,
      textStyle,
      onClick,
      children,
      ...rest
    },
    ref
  ) => {
    // Auto-determine size based on variant if not specified
    const effectiveSize = size || (variant === 'framed' ? 'large' : 'medium');
    const hasValue = !!value;

    // Render icon with priority: props.icon (string or ReactNode)
    const getIconElement = () => {
      if (!icon) return null;

      if (typeof icon === 'string') {
        return <Icon src={icon} />;
      }
      return icon;
    };

    const iconElement = getIconElement();

    return (
      <DropdownButtonContainer
        ref={ref}
        type="button"
        $variant={variant}
        $size={effectiveSize}
        $disabled={disabled}
        $open={open}
        $error={error}
        disabled={disabled}
        onClick={onClick}
        className={className}
        style={style}
        {...rest}
      >
        {iconElement && <IconWrapper $size={effectiveSize}>{iconElement}</IconWrapper>}

        {children ? (
          children
        ) : (
          <TextContent $disabled={disabled} $hasValue={hasValue} style={textStyle}>
            {value || placeholder}
          </TextContent>
        )}

        <IndicatorWrapper $size={effectiveSize} $open={open} $disabled={disabled}>
          {indicatorIcon || <ArrowRightIcon />}
        </IndicatorWrapper>
      </DropdownButtonContainer>
    );
  }
);

DropdownButton.displayName = 'DropdownButton';
