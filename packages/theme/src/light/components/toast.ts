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
    background: '#FFFFFF',
    borderColor: colors.palettes.transparency['10'],
    icon: {
      url: '',
      size: { width: '20px', height: '20px' },
    },
    message: {
      color: colors.palettes.gray['100'],
    },
  },
  info: {
    background: '#FFFFFF',
    borderColor: colors.palettes.transparency['10'],
    icon: {
      url: '',
      size: { width: '20px', height: '20px' },
    },
    message: {
      color: colors.palettes.gray['100'],
    },
  },
  error: {
    background: '#FFFFFF',
    borderColor: colors.palettes.transparency['10'],
    icon: {
      url: '',
      size: { width: '20px', height: '20px' },
    },
    message: {
      color: colors.palettes.gray['100'],
    },
  },
  warn: {
    background: '#FFFFFF',
    borderColor: colors.palettes.transparency['10'],
    icon: {
      url: '',
      size: { width: '20px', height: '20px' },
    },
    message: {
      color: colors.palettes.gray['100'],
    },
  },
  critical: {
    background: '#FFFFFF',
    borderColor: colors.palettes.transparency['10'],
    icon: {
      url: '',
      size: { width: '20px', height: '20px' },
    },
    message: {
      color: colors.palettes.gray['100'],
    },
  },
  loading: {
    background: '#FFFFFF',
    borderColor: colors.palettes.transparency['10'],
    icon: {
      url: '',
      size: { width: '20px', height: '20px' },
    },
    message: {
      color: colors.palettes.gray['100'],
    },
  },
  closeButton: {
    icon: {
      url: ''
    }
  },
};

