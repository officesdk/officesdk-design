import React from 'react';
import { styled } from '../utils/styled';

const ArrowDownIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8.1858 9.79353C8.08649 9.90387 7.91346 9.90387 7.81415 9.79353L4.77549 6.41724C4.6307 6.25636 4.74487 6 4.96132 6L11.0386 6C11.2551 6 11.3693 6.25636 11.2245 6.41724L8.1858 9.79353Z" fill="#41464B" fillOpacity="0.6"/>
    </svg>
  );
};

export interface ToolbarButtonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'onDoubleClick'> {
  /**
   * Whether the button is disabled
   */
  disabled?: boolean;
  /**
   * Whether the button is in active state
   */
  isActive?: boolean;
  /**
   * Icon to display
   * - If string: image URL
   * - If ReactNode: custom icon component
   */
  icon?: string | React.ReactNode;
  /**
   * Label text or custom node
   */
  label?: string | React.ReactNode;
  /**
   * Whether to show dropdown arrow
   */
  hasDropdown?: boolean;
  /**
   * Whether the dropdown section is clickable separately
   */
  splitDropdown?: boolean;
  /**
   * Click handler for main button
   */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Double click handler for main button
   */
  onDoubleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Click handler for dropdown section
   */
  onDropdownClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Custom style
   */
  style?: React.CSSProperties;
}

const ToolbarButtonContainer = styled.div<{
  $disabled: boolean;
  $isActive: boolean;
}>`
  display: inline-flex;
  align-items: center;
  border: 1px solid;
  border-radius: 2px;
  transition: border-color 0.15s ease;
  box-sizing: border-box;
  overflow: hidden;

  ${({ $disabled, $isActive, theme }) => {
    const config = theme.components.toolbarButton;

    if ($disabled) {
      return `
        border-color: ${config.border.borderColorDisabled};
      `;
    }
    if ($isActive) {
      return `
        border-color: ${config.border.borderColorActive};

        ${Divider} {
          background-color: ${config.border.borderColorActive};
        }
      `;
    }
    return `
      border-color: ${config.border.borderColor};

      &:hover {
        border-color: ${config.border.borderColorHover};
        box-shadow: ${config.boxShadow.boxShadowHover};
        ${Divider} {
          background-color: ${config.border.borderColorHover};
        }
      }

      button:active {
        box-shadow: ${config.boxShadow.boxShadowClick};
        ${Divider} {
          background-color: ${config.border.borderColorClick};
        }
      }
    `;
  }}

  ${({ theme }) => {
    const config = theme.components.toolbarButton;
    return `
      height: ${config.layout.height};
      padding: ${config.layout.padding};
      border-radius: ${config.layout.borderRadius};
    `;
  }}
`;

const MainButton = styled.button<{
  $disabled: boolean;
  $isActive: boolean;
  $hasLabel: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  outline: none;
  height: 100%;
  transition: background-color 0.15s ease;

  ${({ theme }) => {
    const config = theme.components.toolbarButton;
    return `
      padding: ${config.layout.content.padding};
    `;
  }}

  ${({ $disabled, $isActive, theme }) => {
    const config = theme.components.toolbarButton;

    if ($disabled) {
      return `
        cursor: not-allowed;
        background: ${config.background.backgroundDisabled};
      `;
    }
    if ($isActive) {
      return `
        background: ${config.background.backgroundActive};
      `;
    }
    return `
      background: ${config.background.background};

      &:hover {
        background: ${config.background.backgroundHover};
      }

      &:active {
        background: ${config.background.backgroundClick};
      }
    `;
  }}
`;

const IconWrapper = styled.span<{ $disabled: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  ${({ theme }) => {
    const config = theme.components.toolbarButton;
    return `
      width: ${config.layout.content.iconSize.width};
      height: ${config.layout.content.iconSize.height};
    `;
  }}

  ${({ $disabled }) => {
    return $disabled ? `opacity: 0.3;` : ``;
  }}

  svg, img {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

const LabelText = styled.span<{ $disabled: boolean }>`
  font-family: 'PingFang SC', sans-serif;
  white-space: nowrap;

  ${({ theme }) => {
    const config = theme.components.toolbarButton;
    return `
      font-size: ${config.typography.fontSize};
      font-weight: ${config.typography.fontWeight};
      line-height: 20px;
      padding: ${config.layout.content.padding};
    `;
  }}

  ${({ $disabled, theme }) => {
    const config = theme.components.toolbarButton;
    return $disabled
      ? `
    color: ${config.color.colorDisabled};
  `
      : `
    color: ${config.color.color};
  `;
  }}
`;

const DropdownButton = styled.button<{
  $disabled: boolean;
  $isActive: boolean;
  $split: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;
  border: none;
  transition: background-color 0.15s ease;

  ${({ theme }) => {
    const config = theme.components.toolbarButton;
    return `
      height: ${config.layout.height};
      padding: 5px 0;
    `;
  }}

  ${({ $disabled, theme }) => {
    const config = theme.components.toolbarButton;

    if ($disabled) {
      return `
        cursor: not-allowed;
        background: ${config.background.backgroundDisabled};
      `;
    }
    return `
      background: ${config.background.background};

      &:hover {
        background: ${config.background.backgroundHover};
      }

      &:active {
        background: ${config.background.backgroundClick};
      }
    `;
  }}
`;

const DropdownArrow = styled.span<{ $disabled: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  ${({ theme }) => {
    const config = theme.components.toolbarButton;
    return `
      width: ${config.layout.dropdown.iconSize.width};
      height: ${config.layout.dropdown.iconSize.height};
    `;
  }}

  ${({ $disabled, theme }) => {
    const config = theme.components.toolbarButton;
    return $disabled
      ? `
    color: ${config.color.colorDisabled};
  `
      : `
    color: ${config.color.color};
  `;
  }}

  svg {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

const Divider = styled.div<{
  $disabled: boolean;
  $isActive: boolean;
}>`
  width: 1px;
  transition: background-color 0.15s ease;

  ${({ theme }) => {
    const config = theme.components.toolbarButton;
    return `
      height: ${config.layout.height};
    `;
  }}

  ${({ $disabled, $isActive, theme }) => {
    const config = theme.components.toolbarButton;

    if ($disabled) {
      return `
        background-color: ${config.border.borderColorDisabled};
      `;
    }
    if ($isActive) {
      return `
        background-color: ${config.border.borderColorActive};
      `;
    }
    return `
      background-color: ${config.border.borderColor};
    `;
  }}
`;

/**
 * ToolbarButton Component
 *
 * A toolbar button with optional icon, label, and dropdown functionality
 *
 * @example
 * // Icon component
 * <ToolbarButton icon={<Icon />} />
 *
 * @example
 * // Icon from URL
 * <ToolbarButton icon="https://example.com/icon.png" />
 *
 * @example
 * // Button with label and dropdown
 * <ToolbarButton icon={<Icon />} label="Format" hasDropdown />
 *
 * @example
 * // Button with custom label node
 * <ToolbarButton icon={<Icon />} label={<CustomLabel />} />
 *
 * @example
 * // Button with split dropdown
 * <ToolbarButton
 *   icon={<Icon />}
 *   label="Format"
 *   hasDropdown
 *   splitDropdown
 *   onClick={handleClick}
 *   onDropdownClick={handleDropdownClick}
 * />
 */
export const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  disabled = false,
  isActive = false,
  icon,
  label,
  hasDropdown = false,
  splitDropdown = false,
  onClick,
  onDoubleClick,
  onDropdownClick,
  className,
  style,
}) => {
  const handleMainClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    onClick?.(e);
  };

  const handleMainDoubleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    onDoubleClick?.(e);
  };

  const handleDropdownClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    e.stopPropagation();
    onDropdownClick?.(e);
  };

  // Render icon based on type
  const renderIcon = () => {
    if (!icon) return null;

    if (typeof icon === 'string') {
      return (
        <IconWrapper $disabled={disabled}>
          <img src={icon} alt="icon" />
        </IconWrapper>
      );
    }

    return <IconWrapper $disabled={disabled}>{icon}</IconWrapper>;
  };

  // Render label based on type
  const renderLabel = () => {
    if (!label) return null;

    if (typeof label === 'string') {
      return <LabelText $disabled={disabled}>{label}</LabelText>;
    }

    return label;
  };

  // Single click area (no split dropdown)
  if (!splitDropdown && hasDropdown) {
    return (
      <ToolbarButtonContainer
        className={className}
        style={style}
        $disabled={disabled}
        $isActive={isActive}
      >
        <MainButton
          $disabled={disabled}
          $isActive={isActive}
          $hasLabel={!!label}
          onClick={handleMainClick}
          onDoubleClick={handleMainDoubleClick}
          disabled={disabled}
        >
          {renderIcon()}
          {renderLabel()}
          <DropdownArrow $disabled={disabled}>
            <ArrowDownIcon />
          </DropdownArrow>
        </MainButton>
      </ToolbarButtonContainer>
    );
  }

  // Split dropdown (two click areas)
  if (splitDropdown && hasDropdown) {
    return (
      <ToolbarButtonContainer
        className={className}
        style={style}
        $disabled={disabled}
        $isActive={isActive}
      >
        <MainButton
          $disabled={disabled}
          $isActive={isActive}
          $hasLabel={!!label}
          onClick={handleMainClick}
          onDoubleClick={handleMainDoubleClick}
          disabled={disabled}
        >
          {renderIcon()}
          {renderLabel()}
        </MainButton>

        <Divider $disabled={disabled} $isActive={isActive} />

        <DropdownButton
          $disabled={disabled}
          $isActive={isActive}
          $split={true}
          onClick={handleDropdownClick}
          disabled={disabled}
        >
          <DropdownArrow $disabled={disabled}>
            <ArrowDownIcon />
          </DropdownArrow>
        </DropdownButton>
      </ToolbarButtonContainer>
    );
  }

  // Simple button (no dropdown)
  return (
    <ToolbarButtonContainer
      className={className}
      style={style}
      $disabled={disabled}
      $isActive={isActive}
    >
      <MainButton
        $disabled={disabled}
        $isActive={isActive}
        $hasLabel={!!label}
        onClick={handleMainClick}
        onDoubleClick={handleMainDoubleClick}
        disabled={disabled}
      >
        {renderIcon()}
        {renderLabel()}
      </MainButton>
    </ToolbarButtonContainer>
  );
};

ToolbarButton.displayName = 'ToolbarButton';
