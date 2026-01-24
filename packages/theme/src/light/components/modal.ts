import { borderRadius, boxShadow, colors, typography } from '../base';

export interface ModalVariantSize {
  maxWidth: string;
  minWidth: string;
  maxHeight: string;
  minHeight: string;
  defaultWidth: string;
}

export interface ModalBaseConfig {
  background: string;
  border: string;
  borderRadius: string;
  shadow: string;
  maskLight: string;
  maskDark: string;
  maskZIndex: number;
  titleColor: string;
  titleFontSize: string;
  titleFontWeight: number;
  titleLineHeight: string;
  bodyColor: string;
  bodyFontSize: string;
  bodyLineHeight: string;
  padding: string;
  closeButtonHoverBackground: string;
  closeButtonActiveBackground: string;
}

export interface ModalConfig {
  message: ModalBaseConfig & ModalVariantSize;
  functional: ModalVariantSize;
}

export const modal: ModalConfig = {
  message: {
    background: colors.palettes.gray['0'],
    border: `1px solid ${colors.palettes.transparency['5']}`,
    borderRadius: borderRadius.medium,
    shadow: boxShadow.xl,
    maskLight: colors.mask.light,
    maskDark: colors.mask.dark,
    maskZIndex: 1000,
    titleColor: colors.palettes.gray['120'],
    titleFontSize: typography.title.fontSize.l,
    titleFontWeight: typography.title.fontWeight.semibold,
    titleLineHeight: typography.title.lineHeight.medium,
    bodyColor: colors.palettes.gray['120'],
    bodyFontSize: typography.paragraph.fontSize.m,
    bodyLineHeight: typography.paragraph.lineHeight.medium,
    padding: '24px 32px',
    closeButtonHoverBackground: colors.palettes.transparency['5'],
    closeButtonActiveBackground: colors.palettes.transparency['10'],
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
};
