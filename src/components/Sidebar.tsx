import { useState } from 'react';
import { CaretLeft, CaretRight } from 'phosphor-react';

import { cn } from '../utils/classNames';
import { sidebarLinksData } from '../constants/data';

import { SidebarLink } from './SidebarLink';
import { ThemeSwitch } from './ThemeSwitch';

export function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <aside
      className={cn(
        'pt-2 pb-6 fixed top-0 left-0 h-full flex flex-col items-start bg-slate-200/60 dark:bg-slate-800/60 backdrop-blur drop-shadow-md duration-500',
        isSidebarOpen ? 'w-60' : 'w-20'
      )}
    >
      <button
        type="button"
        onClick={() => setIsSidebarOpen((prev) => !prev)}
        aria-label={isSidebarOpen ? 'Close Menu' : 'Open Menu'}
        aria-controls="main-navigation"
        aria-expanded={isSidebarOpen}
        className="absolute right-0 translate-x-1/2 p-2 bg-red-500 dark:bg-violet-500 rounded-full cursor-pointer hover:bg-red-600 dark:hover:bg-violet-600 focus:bg-red-600 dark:focus:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-slate-300 dark:focus:ring-offset-slate-800 transition-colors duration-200"
      >
        {isSidebarOpen ? (
          <CaretLeft
            weight="bold"
            className="h-6 w-6 text-slate-100 dark:text-slate-900"
          />
        ) : (
          <CaretRight
            weight="bold"
            className="h-6 w-6 text-slate-100 dark:text-slate-900"
          />
        )}
      </button>

      <nav id="main-navigation" className="pt-16 w-full">
        <ul aria-label="main" className="flex flex-col gap-3 w-full">
          {sidebarLinksData.map((link, index) => {
            return (
              <SidebarLink
                key={`${index}-${link.text}`}
                icon={link.icon}
                text={link.text}
                isSidebarOpen={isSidebarOpen}
              />
            );
          })}
        </ul>
      </nav>

      <ThemeSwitch isSidebarOpen={isSidebarOpen} />
    </aside>
  );
}
