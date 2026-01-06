import React from 'react';
import { styled } from '../utils/styled';
import { Icon } from '../Icon';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button variant type
   * - 'icon': Square icon button without padding, size based on iconSize
   */
  variant?: 'solid' | 'outlined' | 'text' | 'icon';
  /**
   * Button color type
   * - 'status' is only available for 'text' variant
   */
  colorType?: 'default' | 'guidance' | 'alert' | 'status';
  /**
   * Button size
   */
  size?: 'small' | 'medium' | 'large' | 'extraLarge';
  /**
   * Whether the button is disabled
   */
  disabled?: boolean;
  /**
   * Whether the button is in loading state
   */
  loading?: boolean;
  /**
   * Whether the button should take full width of its container
   */
  fullWidth?: boolean;
  /**
   * Icon to display with the button text
   * - If string: treated as icon src URL, rendered using Icon component
   * - If ReactNode: rendered directly
   */
  icon?: string | React.ReactNode;
  /**
   * Icon placement relative to text (only for text buttons)
   */
  iconPlacement?: 'before' | 'after';
  /**
   * Whether the icon button should have a border (only for variant='icon')
   */
  iconBordered?: boolean;
}

const IconWrapper = styled.span<{ $size: ButtonProps['size']; $iconPlacement: 'before' | 'after' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  ${({ $size, $iconPlacement, theme }) => {
    const buttonConfig = theme.components.button[$size || 'medium'];
    const sizeConfig = buttonConfig?.withIcon || buttonConfig;
    const marginSide = $iconPlacement === 'before' ? 'margin-right' : 'margin-left';

    return `
      width: ${sizeConfig.iconSize.width};
      height: ${sizeConfig.iconSize.height};
      ${marginSide}: ${sizeConfig.iconGap};

      svg, img {
        width: 100%;
        height: 100%;
        display: block;
      }
    `;
  }}
`;

const TextWrapper = styled.span<{ $size: ButtonProps['size'] }>`
  ${({ $size, theme }) => {
    const buttonConfig = theme.components.button[$size || 'medium'];
    const sizeConfig = buttonConfig?.withIcon || buttonConfig;
    return `
      padding: ${sizeConfig.textPadding || '0'};
    `;
  }}
`;

const IconOnlyWrapper = styled.span<{ $size: ButtonProps['size'] }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  ${({ $size, theme }) => {
    const buttonConfig = theme.components.button[$size || 'medium'];
    const sizeConfig = buttonConfig?.onlyIcon || buttonConfig;
    return `
      width: ${sizeConfig.iconSize?.width || '14px'};
      height: ${sizeConfig.iconSize?.height || '14px'};

      svg, img {
        width: 100%;
        height: 100%;
        display: block;
      }
    `;
  }}
`;

const StyledButton = styled.button<{
  $variant: ButtonProps['variant'];
  $colorType: ButtonProps['colorType'];
  $size: ButtonProps['size'];
  $fullWidth: boolean;
  $iconBordered: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;
  border: none;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  /* Size variants */
  ${({ $size, $variant, theme }) => {
    const sizeName = $size || 'medium';
    const buttonConfig = theme.components.button[sizeName];

    // Icon variant: use onlyIcon config (square button with padding)
    if ($variant === 'icon') {
      const sizeConfig = buttonConfig?.onlyIcon || buttonConfig;
      return `
        padding: ${sizeConfig.padding || '7px'};
        border-radius: ${sizeConfig.borderRadius || theme.borderRadius.small};
      `;
    }

    // Other variants: use withIcon config
    const sizeConfig = buttonConfig?.withIcon || buttonConfig;
    return `
      padding: ${sizeConfig.padding};
      font-size: ${sizeConfig.fontSize};
      line-height: ${sizeConfig.lineHeight};
      border-radius: ${sizeConfig.borderRadius};
      min-height: ${sizeConfig.height};
    `;
  }}

  /* Variant and color type styles */
  ${({ $variant, $colorType, $iconBordered, theme }) => {
    // Handle icon variant buttons
    if ($variant === 'icon') {
      const baseVariant = $iconBordered ? 'outlined' : 'text';
      const styles = theme.components.button[baseVariant]['default'];

      return `
        background: ${styles.background};
        color: ${styles.color};
        border: 1px solid ${styles.borderColor};
        box-shadow: ${styles.boxShadow};

        &:hover:not(:disabled) {
          background: ${styles.backgroundHover};
          color: ${styles.colorHover};
          border-color: ${styles.borderColorHover};
          box-shadow: ${styles.boxShadowHover};
        }

        &:active:not(:disabled) {
          background: ${styles.backgroundActive};
          color: ${styles.colorActive};
          border-color: ${styles.borderColorActive};
          box-shadow: ${styles.boxShadowActive};
        }

        &:disabled {
          background: ${styles.backgroundDisabled};
          color: ${styles.colorDisabled};
          border-color: ${styles.borderColorDisabled};
          box-shadow: ${styles.boxShadowDisabled};
          cursor: not-allowed;
        }
      `;
    }

    const variant = $variant || 'solid';
    const colorType = $colorType || 'default';

    // Validate colorType for variant
    if (colorType === 'status' && variant !== 'text') {
      console.warn(
        `colorType 'status' is only available for 'text' variant. Falling back to 'default'.`
      );
    }

    const effectiveColorType = colorType === 'status' && variant !== 'text' ? 'default' : colorType;
    const styles =
      theme.components.button[variant][
        effectiveColorType as keyof (typeof theme.components.button)[typeof variant]
      ];

    return `
      background: ${styles.background};
      color: ${styles.color};
      border: 1px solid ${styles.borderColor};
      box-shadow: ${styles.boxShadow};
      font-weight: ${styles.fontWeight};

      &:hover:not(:disabled) {
        background: ${styles.backgroundHover};
        color: ${styles.colorHover};
        border-color: ${styles.borderColorHover};
        box-shadow: ${styles.boxShadowHover};
      }

      &:active:not(:disabled) {
        background: ${styles.backgroundActive};
        color: ${styles.colorActive};
        border-color: ${styles.borderColorActive};
        box-shadow: ${styles.boxShadowActive};
      }

      &:disabled {
        background: ${styles.backgroundDisabled};
        color: ${styles.colorDisabled};
        border-color: ${styles.borderColorDisabled};
        box-shadow: ${styles.boxShadowDisabled};
        cursor: not-allowed;
      }
    `;
  }}
`;

/**
 * Button Component
 *
 * @example
 * // Basic button
 * <Button>button</Button>
 *
 * @example
 * // Button with icon (string URL)
 * <Button icon="https://example.com/icon.svg" iconPlacement="before">button</Button>
 *
 * @example
 * // Button with icon (ReactNode)
 * <Button icon={<CustomIcon />} iconPlacement="after">button</Button>
 *
 * @example
 * // Icon variant button (square, no padding)
 * <Button variant="icon" icon={<CustomIcon />} iconBordered />
 *
 * @example
 * // Icon variant button without border
 * <Button variant="icon" icon={<CustomIcon />} />
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'solid',
  colorType = 'default',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  iconPlacement = 'before',
  iconBordered = false,
  children,
  ...rest
}) => {
  return (
    <StyledButton
      $variant={variant}
      $colorType={colorType}
      $size={size}
      $fullWidth={fullWidth}
      $iconBordered={iconBordered}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <TextWrapper $size={size}>Loading...</TextWrapper>
      ) : variant === 'icon' ? (
        // Icon variant: render icon with onlyIcon wrapper (uses onlyIcon config)
        <IconOnlyWrapper $size={size}>
          {typeof icon === 'string' ? <Icon src={icon} /> : icon || children}
        </IconOnlyWrapper>
      ) : (
        <>
          {icon && iconPlacement === 'before' && (
            <IconWrapper $size={size} $iconPlacement="before">
              {typeof icon === 'string' ? <Icon src={icon} /> : icon}
            </IconWrapper>
          )}
          <TextWrapper $size={size}>{children}</TextWrapper>
          {icon && iconPlacement === 'after' && (
            <IconWrapper $size={size} $iconPlacement="after">
              {typeof icon === 'string' ? <Icon src={icon} /> : icon}
            </IconWrapper>
          )}
        </>
      )}
    </StyledButton>
  );
};

Button.displayName = 'Button';
