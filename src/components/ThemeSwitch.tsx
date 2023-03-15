import * as Switch from '@radix-ui/react-switch';

import { useTheme } from '../hooks/useTheme';
import { cn } from '../utils/classNames';

interface ThemeSwitchProps {
  isSidebarOpen: boolean;
}

export function ThemeSwitch({ isSidebarOpen }: ThemeSwitchProps) {
  const { toggleTheme, isDarkMode } = useTheme();

  return (
    <div className="w-full mt-auto">
      <div className="w-full pl-2 py-1 flex items-center gap-3 overflow-hidden">
        <Switch.Root
          id="dark-mode"
          className="py-1 shrink-0 bg-slate-800 w-16 rounded-full relative data-[state=checked]:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-900 dark:focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-slate-200 dark:focus:ring-offset-slate-800 duration-200"
          checked={isDarkMode ? true : false}
          onCheckedChange={toggleTheme}
        >
          <Switch.Thumb className="bg-violet-600 dark:bg-violet-600 w-6 h-6 block rounded-full transition-transform translate-x-2 data-[state=checked]:translate-x-8 duration-100" />
        </Switch.Root>

        <label
          htmlFor="dark-mode"
          className={cn(
            'whitespace-pre overflow-hidden block text-slate-500 dark:text-slate-300 capitalize text-lg font-semibold leading-tight duration-500',
            isSidebarOpen ? '' : 'opacity-0 translate-x-8'
          )}
        >
          dark mode
        </label>
      </div>
    </div>
  );
}
