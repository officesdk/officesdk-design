import { type CommonThemeConfig } from '@officesdk/editor-sdk-core/shared';
import { lightTheme } from './light';

// Extend CommonThemeConfig to include custom components (modal, loading)
export interface Theme extends CommonThemeConfig {
  components: CommonThemeConfig['components'] & {
    modal: typeof import('./light/components').modal;
    loading: typeof import('./light/components').loading;
  };
}

export const theme: Theme = lightTheme;
export { lightTheme } from './light';

// Export config types for components to use
export type { ModalConfig, ModalVariantSize, ModalBaseConfig } from './light/components/modal';
export type { LoadingConfig, LoadingSizeConfig, LoadingWrapperConfig, LoadingFullscreenConfig } from './light/components/loading';
