import React, { useState, useMemo, useEffect } from 'react';
import RcMenu, { MenuItem as RcMenuItem, SubMenu as RcSubMenu, Divider as RcDivider, ItemGroup as RcItemGroup } from 'rc-menu';
import VirtualList from 'rc-virtual-list';
import { styled } from '../utils/styled';
import { Icon } from '../Icon';
import { Input } from '../Input';
import 'rc-menu/assets/index.css';
import { MenuGlobalStyles } from './globalStyle';
import { styleManager } from '../utils/styleManager';

export interface MenuItem {
  type?: 'item';
  key: string;
  label: string;
  description?: string; // Right-aligned text (shortcuts like "Cmd+Ctrl+C")
  icon?: string | React.ReactNode;
  disabled?: boolean;
  selected?: boolean;
  selectable?: boolean; // Whether this item can be selected (shows checkmark)
  children?: MenuItem[]; // SubMenu items
  onClick?: (key: string) => void;
}

export interface MenuGroup {
  type: 'group';
  key: string;
  label: string;
  children: MenuItem[];
}

export interface MenuDivider {
  type: 'divider';
  key: string;
}

export type MenuItemType = MenuItem | MenuGroup | MenuDivider;

export interface MenuProps {
  /**
   * Menu items
   */
  items: MenuItemType[];
  /**
   * Currently selected key(s)
   */
  selectedKeys?: string[];
  /**
   * Open submenu keys (controlled)
   */
  openKeys?: string[];
  /**
   * Menu size
   */
  size?: 'medium' | 'large';
  /**
   * Whether to show search box
   */
  searchable?: boolean;
  /**
   * Search placeholder
   */
  searchPlaceholder?: string;
  /**
   * Max height for scrolling
   */
  maxHeight?: number;
  /**
   * Enable virtual scrolling
   */
  virtual?: boolean;
  /**
   * Whether to always reserve space for active icon (for description alignment)
   */
  reserveActiveIconSpace?: boolean;
  /**
   * Select handler
   */
  onSelect?: (key: string) => void;
  /**
   * Search handler
   */
  onSearch?: (value: string) => void;
  /**
   * Open keys change handler
   */
  onOpenChange?: (keys: string[]) => void;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Custom style
   */
  style?: React.CSSProperties;
}

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  min-width: 220px;

  ${({ theme }) => {
    const dropdownConfig = theme.components?.dropdown;
    const menuConfig = theme.components?.menu;

    return `
      background: ${dropdownConfig?.background || '#fff'};
      border: ${menuConfig?.border?.width || '1px'} solid ${menuConfig?.border?.color || 'rgba(65, 70, 75, 0.1)'};
      border-radius: ${menuConfig?.border?.radius || '4px'};
      box-shadow: ${dropdownConfig?.boxShadow || '0 2px 8px rgba(0, 0, 0, 0.15)'};
    `;
  }}

  /* Ensure virtual list container has proper width */
  .rc-virtual-list {
    width: 100%;
  }

  .rc-virtual-list-holder {
    width: 100%;
  }

  .rc-virtual-list-holder-inner {
    width: 100%;
  }
`;

const SearchBoxContainer = styled.div`
  padding: 8px 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors?.palettes?.transparency?.['10']};
`;

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 14L11.1 11.1"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// MenuItem content wrapper
const MenuItemContent = styled.div<{ $size: 'medium' | 'large' }>`
  display: flex;
  align-items: center;
  width: 100%;

  ${({ theme }) => {
    const config = theme.components?.menu?.menuItem;
    return `
      gap: ${config?.layout?.gap || '8px'};
    `;
  }}
`;

// Icon container
const IconContainer = styled.div<{ $size: 'medium' | 'large' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  ${({ theme }) => {
    const iconSize = theme.components?.menu?.menuItem?.icon?.size;
    return `
      width: ${iconSize?.width || '18px'};
      height: ${iconSize?.height || '18px'};

      svg, img {
        width: 100%;
        height: 100%;
      }
    `;
  }}
`;

// Content block (label + description, two-end alignment)
const ContentBlock = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-width: 0;
`;

// Label text
const LabelText = styled.div<{ $size: 'medium' | 'large'; $disabled: boolean }>`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 20px;

  ${({ $size, $disabled, theme }) => {
    const config = theme.components?.menu?.menuItem;
    const sizeConfig = config?.size?.[$size];
    const colorConfig = config?.label?.color;

    const fontSize = sizeConfig?.label?.fontSize || '13px';
    const color = $disabled
      ? (colorConfig?.disabled || 'rgba(65, 70, 75, 0.3)')
      : (colorConfig?.normal || '#41464b');

    return `
      font-size: ${fontSize};
      color: ${color};
    `;
  }}
`;

// Description text (shortcuts, right-aligned)
const DescriptionText = styled.div<{ $size: 'medium' | 'large'; $disabled: boolean }>`
  flex: 0 0 auto;
  white-space: nowrap;
  line-height: 20px;
  text-align: right;

  ${({ $size, $disabled, theme }) => {
    const config = theme.components?.menu?.menuItem;
    const sizeConfig = config?.size?.[$size];
    const colorConfig = config?.description?.color;

    const fontSize = sizeConfig?.description?.fontSize || '10px';
    const color = $disabled
      ? (colorConfig?.disabled || 'rgba(65, 70, 75, 0.3)')
      : (colorConfig?.normal || 'rgba(65, 70, 75, 0.6)');

    return `
      font-size: ${fontSize};
      color: ${color};
    `;
  }}
`;

// Selected checkmark icon (with placeholder support)
const ActiveIconContainer = styled.div<{
  $size: 'medium' | 'large';
  $visible: boolean;
  $placeholder: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  ${({ $size, theme }) => {
    const sizeConfig = theme.components?.menu?.menuItem?.size?.[$size];
    const iconSize = sizeConfig?.activeIcon?.size;

    return `
      width: ${iconSize?.width || '18px'};
      height: ${iconSize?.height || '18px'};
    `;
  }}

  ${({ $visible, $placeholder }) => {
    if (!$visible && !$placeholder) {
      return 'display: none;';
    }
    if ($placeholder && !$visible) {
      return 'visibility: hidden;'; // Reserve space but invisible
    }
    return '';
  }}
`;

// Next level arrow icon
const NextLevelIconContainer = styled.div<{ $size: 'medium' | 'large' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  ${({ $size, theme }) => {
    const sizeConfig = theme.components?.menu?.menuItem?.size?.[$size];
    const iconSize = sizeConfig?.nextLevelIcon?.size;

    return `
      width: ${iconSize?.width || '18px'};
      height: ${iconSize?.height || '18px'};
    `;
  }}
`;

const CheckmarkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M14.25 5.25L7.125 12.375L3.75 9"
      stroke="#41464B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M6.75 4.5L11.25 9L6.75 13.5"
      stroke="#41464B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Menu Component
 *
 * A menu component based on rc-menu with virtual scrolling support
 *
 * @example
 * // Basic menu
 * <Menu
 *   items={[
 *     { key: '1', label: 'Option 1' },
 *     { key: '2', label: 'Option 2' },
 *   ]}
 *   onSelect={(key) => console.log(key)}
 * />
 *
 * @example
 * // Menu with groups and dividers
 * <Menu
 *   items={[
 *     { type: 'group', key: 'g1', label: 'Group A', children: [...] },
 *     { type: 'divider', key: 'd1' },
 *     { key: '1', label: 'Option 1' },
 *   ]}
 * />
 *
 * @example
 * // Menu with search
 * <Menu
 *   searchable
 *   items={items}
 *   onSearch={(value) => console.log(value)}
 * />
 */
export const Menu: React.FC<MenuProps> = ({
  items,
  selectedKeys = [],
  openKeys,
  size = 'large',
  searchable = false,
  searchPlaceholder = 'Enter search content',
  maxHeight = 300,
  virtual = false,
  reserveActiveIconSpace = true,
  onSelect,
  onSearch,
  onOpenChange,
  className,
  style,
}) => {
  // Inject styles on first render using styleManager
  useEffect(() => {
    styleManager.inject('od-menu-styles', MenuGlobalStyles);
  }, []);

  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value: string) => {
    setSearchValue(value);
    onSearch?.(value);
  };

  // Filter items based on search (supports recursive submenu search)
  const filteredItems = useMemo(() => {
    if (!searchValue) return items;

    const searchLower = searchValue.toLowerCase();

    const filterMenuItem = (item: MenuItem): MenuItem | null => {
      // If item itself matches, return it with all children
      if (item.label.toLowerCase().includes(searchLower) ||
          item.description?.toLowerCase().includes(searchLower)) {
        return item;
      }

      // If item has children, check if any child matches
      if (item.children && item.children.length > 0) {
        const filteredChildren = item.children
          .map(child => filterMenuItem(child))
          .filter(Boolean) as MenuItem[];

        if (filteredChildren.length > 0) {
          // Parent doesn't match but children do - return with filtered children
          return { ...item, children: filteredChildren };
        }
      }

      return null;
    };

    const filterItem = (item: MenuItemType): MenuItemType | null => {
      if (item.type === 'divider') return null;

      if (item.type === 'group') {
        // Filter group children
        const filteredChildren = item.children
          .map(child => filterMenuItem(child))
          .filter(Boolean) as MenuItem[];

        // Only show group if it has matching children
        if (filteredChildren.length > 0) {
          return { ...item, children: filteredChildren };
        }
        return null;
      }

      // Regular item with potential submenu
      return filterMenuItem(item);
    };

    return items
      .map(item => filterItem(item))
      .filter(Boolean) as MenuItemType[];
  }, [items, searchValue]);

  // Render menu item content
  const renderMenuItemContent = (item: MenuItem, reserveSpace: boolean) => {
    const isSelected = item.selected || selectedKeys.includes(item.key);
    const isSelectable = item.selectable !== false; // Default to true
    const shouldShowActiveIcon = isSelectable && isSelected;
    const shouldReserveSpace = reserveSpace || isSelectable;

    // Icon element
    const iconElement = item.icon ? (
      <IconContainer $size={size}>
        {typeof item.icon === 'string' ? <Icon src={item.icon} /> : item.icon}
      </IconContainer>
    ) : null;

    return (
      <MenuItemContent $size={size}>
        {iconElement}

        <ContentBlock>
          <LabelText $size={size} $disabled={!!item.disabled}>
            {item.label}
          </LabelText>

          {item.description && (
            <DescriptionText $size={size} $disabled={!!item.disabled}>
              {item.description}
            </DescriptionText>
          )}
        </ContentBlock>

        {/* Active icon - always reserve space if needed for alignment */}
        <ActiveIconContainer
          $size={size}
          $visible={shouldShowActiveIcon}
          $placeholder={shouldReserveSpace && !shouldShowActiveIcon}
        >
          {shouldShowActiveIcon && <CheckmarkIcon />}
        </ActiveIconContainer>

        {item.children && item.children.length > 0 && (
          <NextLevelIconContainer $size={size}>
            <ArrowIcon />
          </NextLevelIconContainer>
        )}
      </MenuItemContent>
    );
  };

  // Render item based on type
  const renderItem = (item: MenuItemType): React.ReactNode => {
    // Divider
    if (item.type === 'divider') {
      return <RcDivider key={item.key} />;
    }

    // Group
    if (item.type === 'group') {
      return (
        <RcItemGroup key={item.key} title={item.label}>
          {item.children.map(child => renderMenuItem(child))}
        </RcItemGroup>
      );
    }

    // Regular item
    return renderMenuItem(item);
  };

  // Render menu item (supports submenu)
  const renderMenuItem = (item: MenuItem): React.ReactNode => {
    // SubMenu
    if (item.children && item.children.length > 0) {
      return (
        <RcSubMenu
          key={item.key}
          title={renderMenuItemContent(item, reserveActiveIconSpace)}
          disabled={item.disabled}
          popupOffset={[5, 0]}
        >
          {item.children.map(child => renderMenuItem(child))}
        </RcSubMenu>
      );
    }

    // Regular item
    return (
      <RcMenuItem
        key={item.key}
        disabled={item.disabled}
        onClick={() => {
          item.onClick?.(item.key);
          onSelect?.(item.key);
        }}
      >
        {renderMenuItemContent(item, reserveActiveIconSpace)}
      </RcMenuItem>
    );
  };

  // Virtual list wrapper
  const itemHeight = size === 'medium' ? 28 : 36;

  // Force re-render when openKeys changes to close submenus
  const menuKey = openKeys?.join(',') || 'menu';

  return (
    <MenuContainer className={className} style={style}>
      {searchable && (
        <SearchBoxContainer>
          <Input
            lineType="underlined"
            size="small"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            clearable
            onClear={() => handleSearch('')}
            prefixNode={<SearchIcon />}
          />
        </SearchBoxContainer>
      )}

      {virtual && filteredItems.length > 10 ? (
        <VirtualList
          data={filteredItems}
          height={maxHeight}
          itemHeight={itemHeight}
          itemKey="key"
          fullHeight={false}
          style={{ width: '100%' }}
        >
          {(item: MenuItemType) => (
            <RcMenu
              key={menuKey}
              prefixCls="od-menu"
              mode="vertical"
              selectedKeys={selectedKeys}
              openKeys={openKeys}
              onOpenChange={onOpenChange}
              triggerSubMenuAction="hover"
              expandIcon={null}
              style={{
                border: 'none',
                background: 'transparent',
                padding: 0,
              }}
            >
              {renderItem(item)}
            </RcMenu>
          )}
        </VirtualList>
      ) : (
        <RcMenu
          key={menuKey}
          prefixCls="od-menu"
          mode="vertical"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          triggerSubMenuAction="hover"
          expandIcon={null}
          style={{
            border: 'none',
            background: 'transparent',
          }}
        >
          {filteredItems.map(renderItem)}
        </RcMenu>
      )}
    </MenuContainer>
  );
};

Menu.displayName = 'Menu';

