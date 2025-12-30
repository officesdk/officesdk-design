import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

export interface TabItem {
  /**
   * Unique key for the tab
   */
  key: string;
  /**
   * Tab label
   */
  label: string;
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
}

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TabList = styled.div<{
  $variant: 'line' | 'card';
}>`
  display: flex;
  align-items: center;
  position: relative;

  ${({ $variant, theme }) => {
    const variantConfig = theme.components.tab[$variant];
    return `
      gap: ${variantConfig.layout.gap};
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
      height: ${sizeConfig.height};
      padding: ${sizeConfig.padding};
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
        border-color: ${itemConfig.borderColorDisabled};
        color: ${itemConfig.colorDisabled};
      `;
    }

    if ($active) {
      return `
        background: ${itemConfig.backgroundActive};
        border-color: ${itemConfig.borderColorActive};
        color: ${itemConfig.colorActive};
      `;
    }

    return `
      background: ${itemConfig.background};
      border-color: ${itemConfig.borderColor};
      color: ${itemConfig.color};
    `;
  }}

  ${({ $variant, $disabled, theme }) => {
    if ($disabled) return '';

    const variantConfig = theme.components.tab[$variant];
    const itemConfig = variantConfig.item;

    return `
      &:hover {
        background: ${itemConfig.backgroundHover};
        border-color: ${itemConfig.borderColorHover};
        color: ${itemConfig.colorHover};
      }
    `;
  }}

  ${({ $variant, $active }) => {
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

    if ($variant === 'card') {
      return `
        border: 1px solid;
        ${
          $active
            ? `
          border-bottom-color: transparent;
          margin-bottom: -1px;
        `
            : ''
        }
      `;
    }

    return '';
  }}
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
  onChange,
  className,
  style,
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
    <TabContainer className={className} style={style}>
      <TabList $variant={variant} role="tablist">
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
          >
            {item.icon && <span>{item.icon}</span>}
            {item.label}
          </TabItem>
        ))}
      </TabList>
    </TabContainer>
  );
};

Tabs.displayName = 'Tab';
