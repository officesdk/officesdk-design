// Export all icon components
export * from './icons';

// Export registry (minimal - only internal icons)
export { iconRegistry, getIcon, ICON_NAMES } from './registry';

// Export full registry for documentation/prototyping (tree-shakeable)
export { allIconRegistry } from './allIconRegistry';

// Export createIconRegistry for tree-shakeable custom registries
export { createIconRegistry } from './createIconRegistry';

// Export category arrays
export {
  ARROWS_ICONS,
  GENERAL_ICONS,
  IMAGE_ICONS,
  MAIN_SITE_ICONS,
  STATUS_ICONS,
  TABLE_ICONS,
  TEXT_ICONS,
  UTILITY_ICONS,
} from './registry';

// Export types
export type { IconComponent, IconRegistry } from './types';
export type {
  IconName,
  ArrowsIconName,
  GeneralIconName,
  ImageIconName,
  MainSiteIconName,
  StatusIconName,
  TableIconName,
  TextIconName,
  UtilityIconName,
} from './types.generated';

// Backward compatibility alias
export type { ArrowsIconName as ArrowIconName } from './types.generated';
