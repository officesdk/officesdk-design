import { Theme } from "@officesdk/design-theme";

const globalTheme: Theme = {};

const registerGlobalTheme = (theme: Theme) => {
  // Replace the reference instead of mutating
  Object.assign(globalTheme, { ...globalTheme, ...theme });
};

export const getGlobalTheme = (): Theme => {
  return globalTheme;
};

/**
 * Register global context
 *
 * Registers theme to the global context. Can be called multiple times
 * (e.g., in tests) to update the theme.
 *
 * @param context - The context to register
 */
export const registerGlobalContext = (context: { theme: Theme }) => {
  if (context.theme) {
    registerGlobalTheme(context.theme);
  }
};
