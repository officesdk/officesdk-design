import { BorderRadiusConfig } from '@officesdk/editor-sdk-core/shared';

const palettes = {
  // Brand colors
  brand: '#41464b',

  // Red scale
  red: {
    '1': '#fdedf0',
    '2': '#fad2d8',
    '3': '#e9a2a5',
    '4': '#de7f83',
    '5': '#e96465',
    '6': '#e95555',
    '7': '#e0504e',
    '8': '#cd4747',
    '9': '#c04140',
    '10': '#af3a37',
  },

  // Orange scale
  orange: {
    '1': '#fde7e1',
    '2': '#fdc8ab',
    '3': '#faa573',
    '4': '#f3833a',
    '5': '#ed6b00',
    '6': '#e65600',
    '7': '#dc5000',
    '8': '#cf4900',
    '9': '#c24100',
    '10': '#ab3300',
  },

  // Yellow scale
  yellow: {
    '1': '#fcfcea',
    '2': '#f8f7cb',
    '3': '#f4f2aa',
    '4': '#f1ed8b',
    '5': '#eee874',
    '6': '#ebe361',
    '7': '#e9d45c',
    '8': '#e5bf52',
    '9': '#e0a849',
    '10': '#d78539',
  },

  // Green scale
  green: {
    '1': '#e8f3e8',
    '2': '#c7e2c7',
    '3': '#a4d0a3',
    '4': '#80be7f',
    '5': '#66b165',
    '6': '#4ea44b',
    '7': '#459542',
    '8': '#3a8438',
    '9': '#30732e',
    '10': '#1e541d',
  },

  // Cyan scale
  cyan: {
    '1': '#e0f9fd',
    '2': '#b1eff8',
    '3': '#7ae6f5',
    '4': '#37d9f0',
    '5': '#00d2ec',
    '6': '#00c9e8',
    '7': '#00b9d4',
    '8': '#00a3b8',
    '9': '#008fa0',
    '10': '#006c72',
  },

  // Blue scale
  blue: {
    '1': '#e4f1fb',
    '2': '#bfdcf7',
    '3': '#98c7f1',
    '4': '#73b1eb',
    '5': '#6da0e3',
    '6': '#5ba0e7',
    '7': '#4583d4',
    '8': '#3e72c1',
    '9': '#3861af',
    '10': '#2d448f',
  },

  // Purple scale
  purple: {
    '1': '#e7e3f0',
    '2': '#c3bbda',
    '3': '#9c8ec1',
    '4': '#7562ab',
    '5': '#59439e',
    '6': '#3a2590',
    '7': '#31218b',
    '8': '#221a83',
    '9': '#10147b',
    '10': '#000a6d',
  },

  // Gray scale
  gray: {
    '0': '#fff',
    '1': '#fdfdfd',
    '2': '#fbfbfb',
    '3': '#f9f9f9',
    '4': '#f7f7f7',
    '5': '#f6f6f6',
    '6': '#f4f4f4',
    '7': '#f2f2f2',
    '8': '#f1f1f1',
    '9': '#eee',
    '10': '#eceded',
    '20': '#d9dadb',
    '30': '#c6c8c9',
    '40': '#b3b5b7',
    '50': '#a0a2a5',
    '60': '#8d9093',
    '70': '#7a7e81',
    '80': '#676b6f',
    '90': '#54585d',
    '100': '#41464b',
    '110': '#363b3e',
    '120': '#2c3033',
  },

  // Transparency scale (using rgba for light theme)
  transparency: {
    '2': 'rgba(65, 70, 75, 0.02)',
    '5': 'rgba(65, 70, 75, 0.05)',
    '8': 'rgba(65, 70, 75, 0.08)',
    '10': 'rgba(65, 70, 75, 0.10)',
    '15': 'rgba(65, 70, 75, 0.15)',
    '20': 'rgba(65, 70, 75, 0.20)',
    '30': 'rgba(65, 70, 75, 0.30)',
    '40': 'rgba(65, 70, 75, 0.40)',
    '50': 'rgba(65, 70, 75, 0.50)',
    '60': 'rgba(65, 70, 75, 0.60)',
    '70': 'rgba(65, 70, 75, 0.70)',
    '80': 'rgba(65, 70, 75, 0.80)',
    '90': 'rgba(65, 70, 75, 0.90)',
    '100': 'rgba(65, 70, 75, 1)',
    '110': '#363b3e',
    '120': '#2c3033',
  },
};

export const colors = {
  base: {
    default: palettes.brand,
    notice: palettes.blue['5'],
    success: palettes.green['6'],
    warning: palettes.yellow['7'],
    error: palettes.red['6'],
    guidance: palettes.blue['6'],
  },
  border: {
    default: palettes.transparency['10'],
    hover: palettes.transparency['20'],
    active: palettes.transparency['30'],
    error: palettes.red['6'],
    disabled: palettes.transparency['10'],
  },
  background: {
    hover: palettes.transparency['5'],
    selected: palettes.transparency['10'],
    disabled: palettes.gray['5'],
  },
  mask: {
    light: palettes.transparency['50'],
    dark: palettes.transparency['80'],
  },
  gradient: {
    dark: `linear-gradient(0deg, ${palettes.gray['120']} -0.09%, ${palettes.gray['90']} 100%)`,
    guidance: `linear-gradient(0deg, ${palettes.blue['8']} -0.09%, ${palettes.blue['5']} 100%)`,
    light: `linear-gradient(0deg, ${palettes.gray['5']} -0.09%, ${palettes.gray['0']} 100%)`,
    error: `linear-gradient(0deg, ${palettes.red['8']} -0.09%, ${palettes.red['5']} 100%)`,
  },
  palettes: {
    brand: palettes.brand,
    red: palettes.red,
    yellow: palettes.yellow,
    orange: palettes.orange,
    green: palettes.green,
    cyan: palettes.cyan,
    blue: palettes.blue,
    purple: palettes.purple,
    gray: palettes.gray,
    transparency: palettes.transparency,
  },
};

export const boxShadow = {
  small: '0 2px 8px 0 rgba(0, 0, 0, 0.04)',
  medium: '0 4px 10px rgba(65, 70, 75, 0.06)',
  large: '0 8px 18px 0 rgba(0, 0, 0, 0.06)',
  xl: '0 20px 32px 0 rgba(0, 0, 0, 0.06)',
};

export const borderRadius: BorderRadiusConfig = {
  none: 0 as const,
  small: '2px',
  medium: '4px',
  large: '8px',
  xl: '12px',
  xxl: '16px',
  full: '1000px' as const,
};

export const typography = {
  title: {
    fontFamily: {
      base: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    fontSize: {
      xs: '12px',
      s: '13px',
      m: '14px',
      l: '16px',
      xl: '20px',
      xxl: '24px',
      xxxl: '32px',
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: '1.2',
      regular: '1.4',
      medium: '1.5',
      relaxed: '1.6',
      loose: '1.8',
    },
  },
  paragraph: {
    fontFamily: {
      base: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    fontSize: {
      xs: '12px',
      s: '13px',
      m: '14px',
      l: '16px',
      xl: '18px',
      xxl: '20px',
      xxxl: '24px',
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: '1.4',
      regular: '1.5',
      medium: '1.6',
      relaxed: '1.7',
      loose: '2',
    },
  },
  article: {
    fontFamily: {
      base: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    fontSize: {
      xs: '12px',
      s: '14px',
      m: '16px',
      l: '18px',
      xl: '20px',
      xxl: '24px',
      xxxl: '28px',
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: '1.5',
      regular: '1.6',
      medium: '1.7',
      relaxed: '1.8',
      loose: '2',
    },
  },
};
