import React from 'react';
import styled from 'styled-components';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button variant type
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
   * Icon to display before the button text
   */
  iconBefore?: React.ReactNode;
  /**
   * Icon to display after the button text
   */
  iconAfter?: React.ReactNode;
  /**
   * Whether the icon button should have a border (only for variant='icon')
   */
  iconBordered?: boolean;
}

const IconWrapper = styled.span<{ $size: ButtonProps['size']; $position: 'before' | 'after' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  ${({ $size, $position, theme }) => {
    const sizeConfig = theme.components.button[$size || 'medium'];
    const marginSide = $position === 'before' ? 'margin-right' : 'margin-left';

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

const StyledButton = styled.button<{
  $variant: ButtonProps['variant'];
  $colorType: ButtonProps['colorType'];
  $size: ButtonProps['size'];
  $fullWidth: boolean;
  $isIconOnly: boolean;
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
  ${({ $size, $isIconOnly, theme }) => {
    const sizeConfig = theme.components.button[$size || 'medium'];

    if ($isIconOnly) {
      return `
        padding: 0;
        width: ${sizeConfig.height};
        height: ${sizeConfig.height};
        border-radius: ${sizeConfig.borderRadius};
      `;
    }

    return `
      padding: ${sizeConfig.padding};
      font-size: ${sizeConfig.fontSize};
      line-height: ${sizeConfig.lineHeight};
      border-radius: ${sizeConfig.borderRadius};
      min-height: ${sizeConfig.height};
    `;
  }}

  /* Variant and color type styles */
  ${({ $variant, $colorType, $isIconOnly, $iconBordered, theme }) => {
    // Handle icon-only buttons
    if ($variant === 'icon' || $isIconOnly) {
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
      console.warn(`colorType 'status' is only available for 'text' variant. Falling back to 'default'.`);
    }

    const effectiveColorType = (colorType === 'status' && variant !== 'text') ? 'default' : colorType;
    const styles = theme.components.button[variant][effectiveColorType as keyof typeof theme.components.button[typeof variant]];

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
 * // Button with icons
 * <Button iconBefore={<Icon />}>button</Button>
 *
 * @example
 * // Icon-only button
 * <Button variant="icon" iconBordered><Icon /></Button>
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'solid',
  colorType = 'default',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  iconBefore,
  iconAfter,
  iconBordered = false,
  children,
  ...rest
}) => {
  // Determine if this is an icon-only button
  const isIconOnly = variant === 'icon' || (!children && !!(iconBefore || iconAfter));

  // For icon-only buttons, use the icon as children
  const iconOnlyContent = iconBefore || iconAfter;

  return (
    <StyledButton
      $variant={variant}
      $colorType={colorType}
      $size={size}
      $fullWidth={fullWidth}
      $isIconOnly={isIconOnly}
      $iconBordered={iconBordered}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <>Loading...</>
      ) : isIconOnly ? (
        iconOnlyContent
      ) : (
        <>
          {iconBefore && (
            <IconWrapper $size={size} $position="before">
              {iconBefore}
            </IconWrapper>
          )}
          {children}
          {iconAfter && (
            <IconWrapper $size={size} $position="after">
              {iconAfter}
            </IconWrapper>
          )}
        </>
      )}
    </StyledButton>
  );
};

Button.displayName = 'Button';

