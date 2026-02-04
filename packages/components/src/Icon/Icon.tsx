import React from 'react';
import { styled } from '../utils/styled';
import { useIconRegistry } from './IconProvider';
import { getGlobalIconRegistry } from '../UIConfigProvider/configManager';

export interface IconSize {
  width: string;
  height: string;
}

export interface IconProps {
  /**
   * Icon name from registry (requires IconProvider)
   */
  name?: string;
  /**
   * Image URL for icon (e.g., PNG, JPG, or external SVG)
   */
  src?: string;
  /**
   * Custom icon element (takes precedence over name and src)
   */
  children?: React.ReactNode;
  /**
   * Size of the icon (px or custom width/height).
   * When not provided, the SVG keeps its original width/height attributes.
   */
  size?: number | string | IconSize;
  /**
   * Color of the icon (only works with SVG icons, not image src).
   * When not provided, the SVG keeps its original colors.
   */
  color?: string;
  /**
   * Alt text for image icons
   */
  alt?: string;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Custom style
   */
  style?: React.CSSProperties;
  /**
   * Click handler
   */
  onClick?: (e: React.MouseEvent) => void;
}

const getSizeValue = (size: number | string | IconSize, dimension: 'width' | 'height'): string => {
  if (typeof size === 'number') {
    return `${size}px`;
  }
  if (typeof size === 'string') {
    return size;
  }
  return size[dimension];
};

const IconContainer = styled.span<{
  $size?: number | string | IconSize;
  $color?: string;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  ${({ $size }) => $size !== undefined && `width: ${getSizeValue($size, 'width')};`}
  ${({ $size }) => $size !== undefined && `height: ${getSizeValue($size, 'height')};`}
  ${({ $color }) => $color !== undefined && `color: ${$color};`}
  ${({ $color }) => $color !== undefined && `--icon-fill: ${$color};`}
  flex-shrink: 0;
  line-height: 1;

  svg {
    ${({ $size }) => $size !== undefined && `width: 100%; height: 100%;`}
    display: block;
  }
`;

/**
 * Icon Component
 *
 * Renders icons from multiple sources with priority: children > src > name
 *
 * @example
 * // Using with IconProvider and registry
 * <Icon name="close" size={16} />
 *
 * @example
 * // Using with image URL
 * <Icon src="/icons/custom-icon.svg" size={24} />
 *
 * @example
 * // Using with custom icon element
 * <Icon><CustomSvg /></Icon>
 *
 * @example
 * // Using with imported icon component
 * import { CloseIcon } from '@officesdk/design/icons';
 * <Icon><CloseIcon /></Icon>
 */
export const Icon: React.FC<IconProps> = ({
  name,
  src,
  children,
  size,
  color,
  alt = 'icon',
  className,
  style,
  onClick,
}) => {
  const contextRegistry = useIconRegistry();
  const globalRegistry = getGlobalIconRegistry();
  // Use context registry first, fallback to global registry
  const registry = contextRegistry || globalRegistry;

  // Priority: custom children > src > registry icon by name
  let iconElement: React.ReactNode = children;

  // If no children, try src
  if (!iconElement && src) {
    iconElement = (
      <img
        src={src}
        alt={alt}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    );
  }

  // If no children and no src, try registry
  if (!iconElement && name) {
    const IconComponent = registry?.[name];
    if (IconComponent) {
      iconElement = <IconComponent />;
    } else if (process.env.NODE_ENV !== 'production') {
      console.warn(
        `Icon "${name}" not found in registry. Make sure IconProvider is set up or call initUIConfig() with icons.`
      );
    }
  }

  if (!iconElement) {
    if (process.env.NODE_ENV !== 'production' && !children && !name && !src) {
      console.warn('Icon: one of "name", "src", or "children" must be provided');
    }
    return null;
  }

  return (
    <IconContainer
      $size={size}
      $color={color}
      className={className}
      style={style}
      onClick={onClick}
    >
      {iconElement}
    </IconContainer>
  );
};

Icon.displayName = 'Icon';

