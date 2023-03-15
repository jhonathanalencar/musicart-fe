import { useState } from 'react';
import { List } from 'phosphor-react';

import { cn } from '../utils/classNames';
import { sidebarLinksData } from '../constants/data';
import logo from '../assets/musicart-logo.png';

import { SidebarLink } from './SidebarLink';
import { ThemeSwitch } from './ThemeSwitch';

export function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <aside
      className={cn(
        'pt-2 pb-6 fixed top-0 left-0 h-full flex flex-col items-start bg-slate-200/60 dark:bg-slate-800/60 backdrop-blur drop-shadow-lg duration-500',
        isSidebarOpen ? 'w-60' : 'w-20'
      )}
    >
      <button
        type="button"
        onClick={() => setIsSidebarOpen((prev) => !prev)}
        aria-label={isSidebarOpen ? 'Close Menu' : 'Open Menu'}
        aria-controls="main-navigation"
        aria-expanded={isSidebarOpen}
        className="self-end mr-2 mt-2 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-slate-300 dark:focus:ring-offset-slate-800 group"
      >
        <List
          weight="bold"
          className="h-8 w-8 text-slate-900 dark:text-violet-500 hover:text-yellow-500 dark:hover:text-teal-500 group-focus:text-yellow-500 dark:group-focus:text-teal-500 transition-colors duration-200"
        />
      </button>

      <div className="h-16 w-16 mt-8 mb-16 mx-auto ">
        <img
          src={logo}
          alt="Musicart Logo"
          className="w-full h-full object-cover"
        />
      </div>

      <nav id="main-navigation" className="w-full">
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
