import { useContextSelector } from 'use-context-selector';

import { ThemeContext } from '../contexts/ThemeContext';

export function useTheme() {
  const isDarkMode = useContextSelector(
    ThemeContext,
    (context) => context.isDarkMode
  );
  const toggleTheme = useContextSelector(
    ThemeContext,
    (context) => context.toggleTheme
  );

  return {
    isDarkMode,
    toggleTheme,
  };
}
