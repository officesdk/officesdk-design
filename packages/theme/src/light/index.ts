import { ThemeMode, type CommonThemeConfig } from '@officesdk/editor-sdk-core/shared';
export type Theme = CommonThemeConfig;

import { colors, boxShadow, borderRadius, typography } from './base';
import { components } from './components';

export const lightTheme = {
  name: 'sm-light',
  mode: ThemeMode.LIGHT,

  colors,
  boxShadow,
  borderRadius,
  typography,
  components: components,
} as unknown as Theme;
