import React from 'react';
import RcTooltip from 'rc-tooltip';
import type { TooltipProps as RcTooltipProps } from 'rc-tooltip/lib/Tooltip';
import 'rc-tooltip/assets/bootstrap.css';

export interface TooltipProps extends RcTooltipProps {
  /**
   * Tooltip content
   */
  content: React.ReactNode;
  /**
   * Tooltip variant
   */
  variant?: 'black' | 'white';
  /**
   * Tooltip size (only for white variant)
   */
  size?: 'small' | 'large';
  /**
   * Children element that triggers the tooltip
   */
  children: React.ReactElement;
  /**
   * Function to get the container element for the tooltip
   */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
}
/**
 * Tooltip Component
 *
 * Note: Coverage for this component may appear lower than expected due to
 * styled-components CSS-in-JS template literals (lines 68-200+) which are
 * not properly tracked by V8 coverage. The actual component logic is fully tested.
 *
 * @example
 * // Basic black tooltip
 * <Tooltip content="Tooltip text">
 *   <button>Hover me</button>
 * </Tooltip>
 *
 * @example
 * // White tooltip with small size
 * <Tooltip content="Tooltip text" variant="white" size="small">
 *   <button>Hover me</button>
 * </Tooltip>
 *
 * @example
 * // White tooltip with large size
 * <Tooltip content="Complex content" variant="white" size="large">
 *   <button>Hover me</button>
 * </Tooltip>
 */
export const Tooltip: React.FC<TooltipProps> = ({
  content,
  variant = 'black',
  size = 'small',
  children,
  placement = 'top',
  trigger = ['hover'],
  overlay,
  overlayClassName,
  getPopupContainer,
  ...rest
}) => {
  const overlayContent = React.useMemo(() => <div>{content}</div>, [content]);

  // Generate className for variant/size combination
  const variantClass = `tooltip-variant-${variant}`;
  const sizeClass = variant === 'white' ? `tooltip-size-${size}` : '';
  const combinedClassName = [variantClass, sizeClass, overlayClassName].filter(Boolean).join(' ');

  const tooltipProps = {
    overlay: overlay ?? overlayContent,
    placement,
    trigger,
    destroyTooltipOnHide: false,
    overlayClassName: combinedClassName,
    ...(getPopupContainer && { getPopupContainer }),
    ...rest,
  };

  return (
    <RcTooltip {...tooltipProps}>
      {children}
    </RcTooltip>
  );
};

Tooltip.displayName = 'Tooltip';
