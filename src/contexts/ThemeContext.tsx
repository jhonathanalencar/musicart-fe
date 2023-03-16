import { ReactNode, useCallback, useEffect } from 'react';
import { createContext } from 'use-context-selector';

import { useLocalStorage } from '../hooks/useLocalStorage';
import { useMediaQuery } from '../hooks/useMediaQuery';

interface ThemeContextData {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

interface ThemeContextProviderprops {
  children: ReactNode;
}

type ThemeType = 'dark' | 'light' | 'system';

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)';
const LOCAL_STORAGE_KEY = '@musicart-theme:0.0.1';

const element = document.documentElement;
const darkQuery = window.matchMedia(COLOR_SCHEME_QUERY);

export const ThemeContext = createContext({} as ThemeContextData);

export function ThemeContextProvider({ children }: ThemeContextProviderprops) {
  const isDarkModePreference = useMediaQuery(COLOR_SCHEME_QUERY);

  if (!(LOCAL_STORAGE_KEY in localStorage)) {
    if (isDarkModePreference) {
      element.classList.add('dark');
    } else {
      element.classList.remove('dark');
    }
  }

  const [theme, setTheme] = useLocalStorage<ThemeType>(
    LOCAL_STORAGE_KEY,
    'system'
  );

  const isDarkMode =
    theme === 'dark' || (theme === 'system' && isDarkModePreference);

  const toggleTheme = useCallback(() => {
    if (!(LOCAL_STORAGE_KEY in localStorage)) {
      if (isDarkMode) {
        setTheme('light');
      } else {
        setTheme('dark');
      }
    } else {
      setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    }
  }, [isDarkMode, setTheme]);

  const onWindowMatch = useCallback(() => {
    const storageJSON = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (
      (storageJSON && JSON.parse(storageJSON) === 'dark') ||
      (!(LOCAL_STORAGE_KEY in localStorage) && darkQuery.matches)
    ) {
      element.classList.add('dark');
    } else {
      element.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    switch (theme) {
      case 'dark': {
        element.classList.add('dark');
        break;
      }
      case 'light': {
        element.classList.remove('dark');
        break;
      }
      default: {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        onWindowMatch();
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
