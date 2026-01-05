import React from 'react';
import styled from 'styled-components';

export interface ToolbarButtonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /**
   * Whether the button is disabled
   */
  disabled?: boolean;
  /**
   * Whether the button is in active state
   */
  active?: boolean;
  /**
   * Icon to display
   */
  icon?: React.ReactNode;
  /**
   * Label text
   */
  label?: string;
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
  $active: boolean;
}>`
  display: inline-flex;
  align-items: center;
  border: 1px solid;
  border-radius: 2px;
  transition: border-color 0.15s ease;
  box-sizing: border-box;

  ${({ $disabled, $active, theme }) => {
    const config = theme.components.toolbarButton;

    if ($disabled) {
      return `
        border-color: ${config.border.borderColorDisabled};
      `;
    }
    if ($active) {
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
`;

const MainButton = styled.button<{
  $disabled: boolean;
  $active: boolean;
  $hasLabel: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  outline: none;
  transition: background-color 0.15s ease;

  ${({ $hasLabel, theme }) => {
    const config = theme.components.toolbarButton;
    return `
      height: ${config.layout.height};
      padding: ${$hasLabel ? config.layout.content.padding : config.layout.padding};
    `;
  }}

  ${({ $disabled, $active, theme }) => {
    const config = theme.components.toolbarButton;

    if ($disabled) {
      return `
        cursor: not-allowed;
        background: ${config.background.backgroundDisabled};
      `;
    }
    if ($active) {
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
  $active: boolean;
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
  }
`;

const Divider = styled.div<{
  $disabled: boolean;
  $active: boolean;
}>`
  width: 1px;
  transition: background-color 0.15s ease;

  ${({ theme }) => {
    const config = theme.components.toolbarButton;
    return `
      height: ${config.layout.height};
    `;
  }}

  ${({ $disabled, $active, theme }) => {
    const config = theme.components.toolbarButton;

    if ($disabled) {
      return `
        background-color: ${config.border.borderColorDisabled};
      `;
    }
    if ($active) {
      return `
        background-color: ${config.border.borderColorActive};
      `;
    }
    return `
      background-color: ${config.border.borderColor};
    `;
  }}
`;

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M8.1858 9.79353C8.08649 9.90387 7.91346 9.90387 7.81415 9.79353L4.77549 6.41724C4.6307 6.25636 4.74487 6 4.96132 6L11.0386 6C11.2551 6 11.3693 6.25636 11.2245 6.41724L8.1858 9.79353Z"
      fill="#41464B"
      fillOpacity="0.6"
    />
  </svg>
);

/**
 * ToolbarButton Component
 *
 * A toolbar button with optional icon, label, and dropdown functionality
 *
 * @example
 * // Icon only button
 * <ToolbarButton icon={<Icon />} />
 *
 * @example
 * // Button with label and dropdown
 * <ToolbarButton icon={<Icon />} label="Format" hasDropdown />
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
  active = false,
  icon,
  label,
  hasDropdown = false,
  splitDropdown = false,
  onClick,
  onDropdownClick,
  className,
  style,
}) => {
  const handleMainClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    onClick?.(e);
  };

  const handleDropdownClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    e.stopPropagation();
    onDropdownClick?.(e);
  };

  // Single click area (no split dropdown)
  if (!splitDropdown && hasDropdown) {
    return (
      <ToolbarButtonContainer
        className={className}
        style={style}
        $disabled={disabled}
        $active={active}
      >
        <MainButton
          $disabled={disabled}
          $active={active}
          $hasLabel={!!label}
          onClick={handleMainClick}
          disabled={disabled}
        >
          {icon && <IconWrapper $disabled={disabled}>{icon}</IconWrapper>}
          {label && <LabelText $disabled={disabled}>{label}</LabelText>}
          <DropdownArrow $disabled={disabled}>
            <ArrowIcon />
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
        $active={active}
      >
        <MainButton
          $disabled={disabled}
          $active={active}
          $hasLabel={!!label}
          onClick={handleMainClick}
          disabled={disabled}
        >
          {icon && <IconWrapper $disabled={disabled}>{icon}</IconWrapper>}
          {label && <LabelText $disabled={disabled}>{label}</LabelText>}
        </MainButton>

        <Divider $disabled={disabled} $active={active} />

        <DropdownButton
          $disabled={disabled}
          $active={active}
          $split={true}
          onClick={handleDropdownClick}
          disabled={disabled}
        >
          <DropdownArrow $disabled={disabled}>
            <ArrowIcon />
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
      $active={active}
    >
      <MainButton
        $disabled={disabled}
        $active={active}
        $hasLabel={!!label}
        onClick={handleMainClick}
        disabled={disabled}
      >
        {icon && <IconWrapper $disabled={disabled}>{icon}</IconWrapper>}
        {label && <LabelText $disabled={disabled}>{label}</LabelText>}
      </MainButton>
    </ToolbarButtonContainer>
  );
};

ToolbarButton.displayName = 'ToolbarButton';
