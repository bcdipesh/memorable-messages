import { createContext, useContext, useEffect, useState } from "react";

// Create context to manage theme state across components
const ThemeProviderContext = createContext({
  theme: "system", // Default theme
  setTheme: () => null, // Placeholder for theme setting function
});

/**
 * ThemeProvider component to wrap the application and manage theme state.
 *
 * @param {React.ReactNode} children - The child components to be wrapped.
 * @param {string} defaultTheme - The default theme to use if none is stored.
 * @param {string} storageKey - The name of the localStorage key to store the theme preference.
 * @param {object} props - Other props to pass to the context provider.
 * @returns {React.ReactElement} The rendered component.
 */
export const ThemeProvider = ({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}) => {
  /**
   * Manage theme state using useState.
   * - Retrieve the stored theme from localStorage or use the default.
   */
  const [theme, setTheme] = useState(
    () => localStorage.getItem(storageKey) || defaultTheme,
  );

  /**
   * Use effect to apply the theme to the document body:
   * - Remove any existing light/dark classes.
   * - Apply system theme based on user preference if selected.
   * - Apply the specified theme otherwise.
   */
  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  /**
   * Provide theme state and setting function to the context.
   */
  const value = {
    theme,
    setTheme: (newTheme) => {
      localStorage.setItem(storageKey, newTheme), setTheme(newTheme);
    },
  };

  /**
   * Wrap children with the context provider.
   */
  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
};

/**
 * Custom hook to access theme state and setting function from anywhere in the component tree.
 *
 * @returns {ThemeProviderContext} The theme context value.
 */
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
