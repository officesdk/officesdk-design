import type { IconComponent } from './types';
import type { IconName } from './types.generated';

/**
 * Type for a partial icon registry - only includes icons the user imports
 */
type IconMap = Partial<Record<IconName, IconComponent>>;

/**
 * Creates a custom icon registry with only the icons you need.
 * This enables tree-shaking while preserving the `<Icon name="..." />` API.
 *
 * @example
 * ```tsx
 * import { createIconRegistry, CheckIcon, CloseIcon, SearchIcon } from '@officesdk/design/icons';
 *
 * // Only these 3 icons will be bundled
 * const myIcons = createIconRegistry({
 *   check: CheckIcon,
 *   close: CloseIcon,
 *   search: SearchIcon,
 * });
 *
 * // Use with IconProvider or initUIConfig
 * <IconProvider icons={myIcons}>
 *   <Icon name="check" size={20} />
 * </IconProvider>
 * ```
 */
export function createIconRegistry<T extends IconMap>(icons: T): T {
  return icons;
}
