import 'styled-components';
import { type Theme } from '@officesdk/design-theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
