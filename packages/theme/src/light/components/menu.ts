import { MenuConfig } from '@officesdk/editor-sdk-core/shared';
import { borderRadius, colors } from '../base';

export const menu: MenuConfig = {
  // Menu item configuration
  menuItem: {
    // Background states
    background: {
      normal: 'transparent',
      hover: colors.palettes.transparency['5'],
      active: colors.palettes.transparency['10'],
      disabled: 'transparent',
    },
    border: {
      radius: '0',
      color: 'transparent',
      width: 'none',
    },
    borderRadius: '0',
    // Layout
    layout: {
      padding: '6px 12px',
      gap: '8px',
    },
    // Icon configuration
    icon: {
      size: { width: '18px', height: '18px' },
    },
    // Label configuration
    label: {
      color: {
        normal: colors.palettes.gray['100'],
        hover: colors.palettes.gray['100'],
        active: colors.palettes.gray['100'],
        disabled: colors.palettes.transparency['30'],
      },
    },
    // Description configuration
    description: {
      color: {
        normal: colors.palettes.transparency['60'],
        hover: colors.palettes.transparency['60'],
        active: colors.palettes.transparency['60'],
        disabled: colors.palettes.transparency['30'],
      },
    },
    // Active/selected icon (checkmark)
    activeIcon: {
      url: '', // Use default checkmark
    },
    // Next level icon (arrow for submenu)
    nextLevelIcon: {
      url: '', // Use default arrow
    },
    // Size configurations
    size: {
      small: {
        label: {
          fontSize: '12px',
          maxWidth: '200px',
        },
        description: {
          fontSize: '10px',
          maxWidth: '150px',
        },
        activeIcon: {
          size: { width: '16px', height: '16px' },
        },
        nextLevelIcon: {
          size: { width: '16px', height: '16px' },
        },
      },

      // Medium size (S - 28px)
      medium: {
        label: {
          fontSize: '12px',
          maxWidth: '200px',
        },
        description: {
          fontSize: '10px',
          maxWidth: '150px',
        },
        activeIcon: {
          size: { width: '16px', height: '16px' },
        },
        nextLevelIcon: {
          size: { width: '16px', height: '16px' },
        },
      },
      // Large size (M - 36px)
      large: {
        label: {
          fontSize: '13px',
          maxWidth: '250px',
        },
        description: {
          fontSize: '10px',
          maxWidth: '180px',
        },
        activeIcon: {
          size: { width: '18px', height: '18px' },
        },
        nextLevelIcon: {
          size: { width: '18px', height: '18px' },
        },
      },
    },
  },
  boxShadow: {
    normal: '0 8px 18px 0 rgba(0, 0, 0, 0.06)',
    hover: '0 8px 18px 0 rgba(0, 0, 0, 0.06)',
  },

  // Border configuration
  border: {
    color: colors.palettes.transparency['10'],
    width: '1px',
    radius: borderRadius.medium,
  },
  // Divider configuration
  divider: {
    background: colors.palettes.transparency['10'],
    height: '1px',
    margin: '4px 0',
  },
  // Group title configuration
  groupTitle: {
    fontSize: '12px',
    fontWeight: '500',
    color: colors.palettes.transparency['60'],
  },

  subMenu: {
    popupOffset: [4, 0],
  },
};
