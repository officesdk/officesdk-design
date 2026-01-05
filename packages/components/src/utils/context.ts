 const globalTheme: Record<string, any> = {}

const registerGlobalTheme = (theme: Record<string, any>) => {
  // Replace the reference instead of mutating
 Object.assign(globalTheme, { ...globalTheme, ...theme });
}

export const getGlobalTheme = () => {
  return globalTheme;
}

/**
 * Register global context
 *
 * Registers theme to the global context. Can be called multiple times
 * (e.g., in tests) to update the theme.
 *
 * @param context - The context to register
 */
export const registerGlobalContext = (context: { theme: Record<string, any> }) => {
  if (context.theme) {
    registerGlobalTheme(context.theme);
  }
}

