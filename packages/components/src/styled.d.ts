import 'styled-components';
import { type Theme } from '@officesdk/ui-theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
