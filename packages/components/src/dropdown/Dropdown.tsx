import React, { useState, useEffect } from 'react';
import RcDropdown from 'rc-dropdown';
import type { DropdownProps as RcDropdownProps } from 'rc-dropdown';
import 'rc-dropdown/assets/index.css';
import { DropdownGlobalStyles } from './globalStyle';
import { styleManager } from '../utils/styleManager';

export interface DropdownProps extends Omit<Partial<RcDropdownProps>, 'prefixCls' | 'placement'> {
  /**
   * Dropdown overlay content (usually a Menu component)
   */
  overlay?: React.ReactElement | (() => React.ReactElement);
  /**
   * Trigger action (click, hover, contextMenu)
   */
  trigger?: ('click' | 'hover' | 'contextMenu')[];
  /**
   * Placement of dropdown
   */
  placement?: 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight';
  /**
   * Whether dropdown is visible (controlled)
   */
  visible?: boolean;
  /**
   * Default visibility (uncontrolled)
   */
  defaultVisible?: boolean;
  /**
   * Callback when visibility changes
   */
  onVisibleChange?: (visible: boolean) => void;
  /**
   * Children element that triggers the dropdown
   */
  children: React.ReactElement;
  /**
   * Dropdown container class name
   */
  overlayClassName?: string;
  /**
   * Function to get the container element for the dropdown
   */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
}

/**
 * Dropdown Component
 *
 * A dropdown container component based on rc-dropdown
 *
 * @example
 * // Basic dropdown with menu
 * <Dropdown
 *   overlay={<Menu items={items} />}
 *   trigger={['click']}
 * >
 *   <DropdownButton value="Select" />
 * </Dropdown>
 *
 * @example
 * // Controlled dropdown
 * <Dropdown
 *   visible={open}
 *   onVisibleChange={setOpen}
 *   overlay={<Menu items={items} />}
 * >
 *   <Button>Click me</Button>
 * </Dropdown>
 *
 * @example
 * // Custom trigger
 * <Dropdown
 *   overlay={<Menu items={items} />}
 *   trigger={['hover']}
 *   placement="bottomLeft"
 * >
 *   <span>Hover me</span>
 * </Dropdown>
 */
export const Dropdown: React.FC<DropdownProps> = ({
  overlay,
  trigger = ['click'],
  placement = 'bottomLeft',
  visible: controlledVisible,
  defaultVisible = false,
  onVisibleChange,
  children,
  overlayClassName,
  getPopupContainer,
  ...rest
}) => {
  // Inject styles on first render using styleManager
  useEffect(() => {
    styleManager.inject('od-dropdown-styles', DropdownGlobalStyles);
  }, []);

  const [internalVisible, setInternalVisible] = useState(defaultVisible);

  const isControlled = controlledVisible !== undefined;
  const isVisible = isControlled ? controlledVisible : internalVisible;

  const handleVisibleChange = (visible: boolean) => {
    if (!isControlled) {
      setInternalVisible(visible);
    }
    onVisibleChange?.(visible);
  };

  return (
    <RcDropdown
      overlay={overlay || <div />}
      trigger={trigger}
      placement={placement}
      visible={isVisible}
      onVisibleChange={handleVisibleChange}
      prefixCls="od-dropdown"
      overlayClassName={overlayClassName}
      getPopupContainer={getPopupContainer}
      {...rest}
    >
      {children}
    </RcDropdown>
  );
};

Dropdown.displayName = 'Dropdown';
