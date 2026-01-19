import { type CommonThemeConfig } from '@officesdk/editor-sdk-core/shared';
import { lightTheme } from './light';

export type Theme = CommonThemeConfig;
export const theme: Theme = lightTheme;
export { lightTheme } from './light';
export type { ModalConfig, ModalVariantSize, ModalBaseConfig } from './light/components/modal';
export type { LoadingConfig, LoadingSizeConfig, LoadingWrapperConfig, LoadingFullscreenConfig } from './light/components/loading';
