import { DropdownConfig, DropdownButtonConfig } from '@officesdk/editor-sdk-core/shared';
import { borderRadius, boxShadow, colors } from '../base';

export const dropdown: DropdownConfig = {
  borderRadius: borderRadius.medium,
  border: `1px solid ${colors.palettes.transparency['10']}`,
  background: colors.palettes.gray['0'],
  boxShadow: boxShadow.large,
  padding: '4px 0',
};

export const dropdownButton: DropdownButtonConfig = {
  // Color states
  color: {
    normal: colors.palettes.gray['100'],
    hover: colors.palettes.gray['100'],
    active: colors.palettes.gray['100'],
    disabled: colors.palettes.transparency['30'],
  },
  // Background states
  background: {
    normal: colors.palettes.gray['0'],
    hover: colors.palettes.gray['0'],
    active: colors.palettes.gray['0'],
    disabled: colors.palettes.gray['5'],
  },
  // Icon configuration
  icon: {
    size: { width: '18px', height: '18px' },
    opacity: {
      normal: '1',
      hover: '1',
      active: '1',
      disabled: '0.3',
    },
  },
  // Indicator (arrow) configuration
  indicator: {
    url: '', // Use default arrow
    size: { width: '18px', height: '18px' },
    rotate: '90deg', // Arrow points right by default, rotate to point down
    opacity: {
      normal: '1',
      hover: '1',
      active: '1',
      disabled: '0.3',
    },
  },
  // Size configurations
  size: {
    large: {
      padding: '10px 16px',
      fontSize: '13px',
      height: '40px',
      gap: '8px',
      iconSize: { width: '18px', height: '18px' },
      indicatorSize: { width: '18px', height: '18px' },
    },
    medium: {
      padding: '4px 8px',
      fontSize: '13px',
      height: '28px',
      gap: '8px',
      iconSize: { width: '18px', height: '18px' },
      indicatorSize: { width: '18px', height: '18px' },
    },
  },
};
