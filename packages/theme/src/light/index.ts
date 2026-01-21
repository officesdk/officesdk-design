import { ThemeMode, type CommonThemeConfig } from '@officesdk/editor-sdk-core/shared';

// Extend CommonThemeConfig to include custom components
export interface Theme extends CommonThemeConfig {
  components: CommonThemeConfig['components'] & {
    modal: typeof import('./components').modal;
    loading: typeof import('./components').loading;
  };
}

import { colors, boxShadow, borderRadius, typography } from './base';
import { components } from './components';

export const lightTheme: Theme = {
  name: 'sm-light',
  mode: ThemeMode.LIGHT,

  colors,
  boxShadow,
  borderRadius,
  typography,
  components: components,
} as unknown as Theme;
