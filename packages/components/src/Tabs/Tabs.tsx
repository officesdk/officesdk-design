import React, { useState, useCallback } from 'react';
import { styled } from '../utils/styled';

export interface TabItem {
  /**
   * Unique key for the tab
   */
  key: string;
  /**
   * Tab label
   */
  label: string | React.ReactNode;
  /**
   * Whether the tab is disabled
   */
  disabled?: boolean;
  /**
   * Custom icon
   */
  icon?: React.ReactNode;
}

export interface TabsProps {
  /**
   * Tab items
   */
  items: TabItem[];
  /**
   * Active tab key
   */
  activeKey?: string;
  /**
   * Default active tab key
   */
  defaultActiveKey?: string;
  /**
   * Tab variant
   */
  variant?: 'line' | 'card';
  /**
   * Tab size
   */
  size?: 'large';
  /**
   * Tab items alignment (only works for 'line' variant)
   */
  justify?: 'start' | 'center' | 'end';
  /**
   * Callback when tab changes
   */
  onChange?: (key: string) => void;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Custom style
   */
  style?: React.CSSProperties;
  /**
   * Custom className for tab item
   */
  tabItemClassName?: string;
  /**
   * Custom style for tab item
   */
  tabItemStyle?: React.CSSProperties;
}

const TabContainer = styled.div<{
  $variant: 'line' | 'card';
}>`
  display: flex;
  flex-direction: column;

  ${({ $variant, theme }) => {

    const variantConfig = theme.components.tab[$variant];
    const sizeConfig = theme.components.tab.large;
    return `
      height: ${sizeConfig.height};
      border-radius: ${sizeConfig.borderRadius};
      background-color: ${variantConfig.backgroundColor};
    `;
  }}
`;

const TabList = styled.div<{
  $variant: 'line' | 'card';
  $justify: 'start' | 'center' | 'end';
}>`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;


  ${({ $variant, $justify, theme }) => {
    const variantConfig = theme.components.tab[$variant];
    const justifyContent =
      $variant === 'line'
        ? $justify === 'center'
          ? 'center'
          : $justify === 'end'
            ? 'flex-end'
            : 'flex-start'
        : 'flex-start';
    return `
      gap: ${variantConfig.layout.gap};
      justify-content: ${justifyContent};
    `;
  }}

  ${({ $variant }) => {
    if ($variant === 'line') {
      return `
        border-bottom: 2px solid rgba(65, 70, 75, 0.1);
      `;
    }
    return '';
  }}
`;

const TabItem = styled.button<{
  $variant: 'line' | 'card';
  $active: boolean;
  $disabled: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: none;
  outline: none;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease;
  position: relative;
  white-space: nowrap;

  ${({ theme }) => {
    const sizeConfig = theme.components.tab.large;
    return `
      height: 100%;
      font-size: ${sizeConfig.fontSize};
      line-height: ${sizeConfig.lineHeight};
      border-radius: ${sizeConfig.borderRadius};
      font-weight: ${sizeConfig.fontWeight};
    `;
  }}

  ${({ $variant, $active, $disabled, theme }) => {
    const variantConfig = theme.components.tab[$variant];
    const itemConfig = variantConfig.item;

    if ($disabled) {
      return `
        background: ${itemConfig.backgroundDisabled};
        color: ${itemConfig.colorDisabled};
      `;
    }

    if ($active) {
      return `
        background: ${itemConfig.backgroundActive};
        color: ${itemConfig.colorActive};
        font-weight: 500;
      `;
    }

    return `
      background: ${itemConfig.background};
      border-color: ${itemConfig.borderColor};
      color: ${itemConfig.color};
    `;
  }}

  ${({ $variant, $disabled, theme, $active }) => {
    if ($disabled) return '';

    const variantConfig = theme.components.tab[$variant];
    const itemConfig = variantConfig.item;

    const isHoverNormal = !$active && !$disabled;

    return `
      &:hover {
        background: ${ isHoverNormal ? itemConfig.backgroundHover : ''};
        border-color: ${ isHoverNormal ? itemConfig.borderColorHover : ''};
        color: ${ isHoverNormal ? itemConfig.colorHover : ''};
      }
    `;
  }}

  ${({ $variant, $active, $disabled, theme }) => {
    // Line variant: show underline when active
    if ($variant === 'line' && $active) {
      return `
        &::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background: currentColor;
        }
      `;
    }

    // Card variant: use box-shadow inset for border
    if ($variant === 'card') {
      const variantConfig = theme.components.tab[$variant];
      const itemConfig = variantConfig.item;

      // Get border color based on state
      let borderColor: string;
      if ($disabled) {
        borderColor = itemConfig.borderColorDisabled;
      } else if ($active) {
        borderColor = itemConfig.borderColorActive;
      } else {
        borderColor = itemConfig.borderColor;
      }


      return `
        box-shadow: inset 0 0 0 1px ${borderColor};
        flex: 1;
        overflow: hidden;
        &:hover {
        }
      `;
    }

    return '';
  }}

  ${({ $variant }) => {
    if ($variant === 'line') {
      return `
        max-width: 160px;
      `;
    }
    return '';
  }}
`;

const TabItemLabel = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
`;

/**
 * Tab Component
 *
 * A tab component with line and card variants
 *
 * @example
 * <Tab
 *   items={[
 *     { key: '1', label: 'Tab 1' },
 *     { key: '2', label: 'Tab 2' },
 *   ]}
 *   defaultActiveKey="1"
 * />
 */
export const Tabs: React.FC<TabsProps> = ({
  items,
  activeKey: controlledActiveKey,
  defaultActiveKey,
  variant = 'line',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  size: _size = 'large',
  justify = 'start',
  onChange,
  className,
  style,
  tabItemClassName,
  tabItemStyle,
}) => {
  const [internalActiveKey, setInternalActiveKey] = useState<string>(
    controlledActiveKey ?? defaultActiveKey ?? items[0]?.key ?? ''
  );

  const activeKey = controlledActiveKey !== undefined ? controlledActiveKey : internalActiveKey;

  const handleTabClick = useCallback(
    (key: string, disabled?: boolean) => {
      if (disabled) return;

      if (controlledActiveKey === undefined) {
        setInternalActiveKey(key);
      }

      onChange?.(key);
    },
    [controlledActiveKey, onChange]
  );

  return (
    <TabContainer $variant={variant} className={className} style={style}>
      <TabList $variant={variant} $justify={justify} role="tablist">
        {items.map((item) => (
          <TabItem
            key={item.key}
            $variant={variant}
            $active={activeKey === item.key}
            $disabled={item.disabled || false}
            onClick={() => handleTabClick(item.key, item.disabled)}
            role="tab"
            aria-selected={activeKey === item.key}
            aria-disabled={item.disabled}
            disabled={item.disabled}
            type="button"
            className={tabItemClassName}
            style={tabItemStyle}
          >
            {!!item.icon && item.icon}
            {typeof item.label === 'string' ? <TabItemLabel>{item.label}</TabItemLabel> : item.label}
          </TabItem>
        ))}
      </TabList>
    </TabContainer>
  );
};

Tabs.displayName = 'Tab';
