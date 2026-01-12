import { colors } from '../base';
import { ToastConfig } from '@officesdk/editor-sdk-core/shared';

export const toast: ToastConfig = {
  padding: '12px 16px',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: 500,
  offset: {
    vertical: '24px',
    horizontal: '24px',
  },
  success: {
    background: colors.palettes.green['1'],
    borderColor: colors.palettes.green['2'],
    icon: {
      url: '',
      size: { width: '20px', height: '20px' },
    },
  },
  info: {
    background: colors.palettes.blue['1'],
    borderColor: colors.palettes.blue['2'],
    icon: {
      url: '',
      size: { width: '20px', height: '20px' },
    },
  },
  error: {
    background: colors.palettes.red['1'],
    borderColor: colors.palettes.red['2'],
    icon: {
      url: '',
      size: { width: '20px', height: '20px' },
    },
  },
  warn: {
    background: colors.palettes.yellow['1'],
    borderColor: colors.palettes.yellow['2'],
    icon: {
      url: '',
      size: { width: '20px', height: '20px' },
    },
  },
  loading: {
    background: colors.palettes.blue['1'],
    borderColor: colors.palettes.blue['2'],
    icon: {
      url: '',
      size: { width: '20px', height: '20px' },
    },
  },
};

