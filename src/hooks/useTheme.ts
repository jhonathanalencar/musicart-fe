import { useEffect } from 'react';

import { useLocalStorage } from './useLocalStorage';
import { useMediaQuery } from './useMediaQuery';

type ThemeType = 'dark' | 'light' | 'system';

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)';
const LOCAL_STORAGE_KEY = '@musicart-theme:0.0.1';

export function useTheme() {
  const element = document.documentElement;
  const darkQuery = window.matchMedia(COLOR_SCHEME_QUERY);

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

  function toggleTheme() {
    if (!(LOCAL_STORAGE_KEY in localStorage)) {
      if (isDarkMode) {
        setTheme('light');
      } else {
        setTheme('dark');
      }
    } else {
      setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    }
  }

  function onWindowMatch() {
    const storageJSON = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (
      (storageJSON && JSON.parse(storageJSON) === 'dark') ||
      (!(LOCAL_STORAGE_KEY in localStorage) && darkQuery.matches)
    ) {
      element.classList.add('dark');
    } else {
      element.classList.remove('dark');
    }
  }

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

  return {
    toggleTheme,
    isDarkMode,
  };
}
