import { borderRadius, boxShadow, colors } from '../base';

export interface ModalVariantSize {
  maxWidth: string;
  minWidth: string;
  maxHeight: string;
  minHeight: string;
  defaultWidth: string;
}

export interface ModalConfig {
  default: {
    background: string;
    border: string;
    borderRadius: string;
    shadow: string;
    maskLight: string;
    maskDark: string;
    titleColor: string;
    titleFontSize: string;
    titleFontWeight: number;
    titleLineHeight: string;
    bodyColor: string;
    bodyFontSize: string;
    bodyLineHeight: string;
    padding: string;
    headerMarginBottom: string;
    footerMarginTop: string;
    footerGap: string;
    defaultWidth: string;
  };
  message: ModalVariantSize;
  functional: ModalVariantSize;
  blue: {
    background: string;
    border: string;
    borderRadius: string;
    shadow: string;
    titleColor: string;
    bodyColor: string;
    defaultWidth: string;
  };
}

export const modal: ModalConfig = {
  default: {
    background: colors.palettes.gray['0'],
    border: `1px solid ${colors.palettes.transparency['5']}`,
    borderRadius: borderRadius.medium,
    shadow: boxShadow.xl,
    maskLight: colors.mask.light,
    // Dark mask uses gray['120'] at 80% opacity as per Figma design
    maskDark: 'rgba(44, 48, 51, 0.8)',
    titleColor: colors.palettes.gray['120'],
    titleFontSize: '16px',
    titleFontWeight: 600,
    titleLineHeight: '24px',
    bodyColor: colors.palettes.gray['120'],
    bodyFontSize: '14px',
    bodyLineHeight: '24px',
    padding: '24px',
    headerMarginBottom: '16px',
    footerMarginTop: '24px',
    footerGap: '8px',
    defaultWidth: '460px',
  },
  message: {
    maxWidth: '400px',
    minWidth: '360px',
    maxHeight: '50vh',
    minHeight: '172px',
    defaultWidth: '400px',
  },
  functional: {
    maxWidth: '800px',
    minWidth: '400px',
    maxHeight: '80vh',
    minHeight: '380px',
    defaultWidth: '640px',
  },
  blue: {
    background: colors.palettes.blue['1'],
    border: `1px solid ${colors.palettes.transparency['10']}`,
    borderRadius: borderRadius.large,
    shadow: boxShadow.xl,
    titleColor: colors.palettes.gray['120'],
    bodyColor: colors.palettes.gray['120'],
    defaultWidth: 'auto',
  },
};
