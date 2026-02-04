/**
 * Icon Registry
 *
 * This file provides:
 * - iconRegistry: Minimal registry containing only icons used internally by the component library
 * - Category arrays: For documentation and reference
 * - ICON_NAMES: All available icon names
 *
 * For tree-shaking, use createIconRegistry to build a custom registry with only the icons you need.
 */
import {
  ArrowRightIcon,
  CheckIcon,
  ChevronDownIcon,
  CloseIcon,
  ErrorIcon,
  InfoIcon,
  LoadingIcon,
  SearchIcon,
  SuccessIcon,
  WarningIcon,
} from './icons';

import type { IconRegistry } from './types';

/**
 * Internal icon registry - contains only icons used by the component library internally.
 *
 * These icons are required for components like Modal (close), Toast (status icons),
 * Checkbox (check), SearchInput (search), DropdownButton (chevron-down),
 * ToolbarButton (chevron-down), and Menu (search, check, arrow-right).
 *
 * For custom icons, use createIconRegistry to build your own registry:
 * @example
 * import { createIconRegistry, CheckIcon, SearchIcon } from '@officesdk/design/icons';
 *
 * const myIcons = createIconRegistry({
 *   check: CheckIcon,
 *   search: SearchIcon,
 * });
 */
export const iconRegistry: IconRegistry = {
  'arrow-right': ArrowRightIcon,
  check: CheckIcon,
  'chevron-down': ChevronDownIcon,
  close: CloseIcon,
  error: ErrorIcon,
  info: InfoIcon,
  loading: LoadingIcon,
  search: SearchIcon,
  success: SuccessIcon,
  warning: WarningIcon,
};

/**
 * Icon categories - for documentation and reference
 */

// Arrows (6)
export const ARROWS_ICONS = [
  'arrow-down',
  'arrow-left',
  'arrow-right',
  'arrow-up',
  'chevron-down',
  'chevron-up',
] as const;

// General (18)
export const GENERAL_ICONS = [
  'check',
  'clear-format',
  'close',
  'copy',
  'cut',
  'delete',
  'format-brush',
  'hide',
  'minus',
  'paste',
  'plus',
  'print',
  'redo',
  'save',
  'search',
  'select-all',
  'undo',
  'workbench',
] as const;

// Image (5)
export const IMAGE_ICONS = [
  'flip-horizontal',
  'flip-vertical',
  'image',
  'rotate-left',
  'rotate-right',
] as const;

// Main-site (11)
export const MAIN_SITE_ICONS = [
  'back',
  'download',
  'edit',
  'filter',
  'grid',
  'list',
  'menu',
  'settings',
  'share',
  'sort',
  'upload',
] as const;

// Status (6)
export const STATUS_ICONS = [
  'error',
  'info',
  'loading',
  'question',
  'success',
  'warning',
] as const;

// Table (4)
export const TABLE_ICONS = [
  'freeze',
  'merge-cells',
  'split-cells',
  'table',
] as const;

// Text (13)
export const TEXT_ICONS = [
  'align-center',
  'align-justify',
  'align-left',
  'align-right',
  'bold',
  'indent-decrease',
  'indent-increase',
  'italic',
  'link',
  'list-bullet',
  'list-number',
  'strikethrough',
  'underline',
] as const;

// Utility (4)
export const UTILITY_ICONS = [
  'exit-fullscreen',
  'fullscreen',
  'more',
  'refresh',
] as const;

/**
 * All available icon names (for documentation and reference)
 */
export const ICON_NAMES = [
  ...ARROWS_ICONS,
  ...GENERAL_ICONS,
  ...IMAGE_ICONS,
  ...MAIN_SITE_ICONS,
  ...STATUS_ICONS,
  ...TABLE_ICONS,
  ...TEXT_ICONS,
  ...UTILITY_ICONS,
] as const;

/**
 * Get icon component by name from the internal registry
 */
export const getIcon = (name: string) => iconRegistry[name];
