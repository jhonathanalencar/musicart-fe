import { useState } from 'react';
import { CaretLeft, CaretRight } from 'phosphor-react';

import { cn } from '../utils/classNames';
import logo from '../assets/musicart-logo.png';

import { ThemeSwitch } from './ThemeSwitch';
import { Navbar } from './Navbar';

export function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <aside
      className={cn(
        'relative pt-2 pb-6 h-screen flex flex-col z-20 items-start bg-slate-200 dark:bg-black backdrop-blur drop-shadow-lg duration-500',
        isSidebarOpen ? 'w-64' : 'w-20'
      )}
    >
      <div className="h-16 w-16 mt-2 mb-4 mx-auto">
        <img
          src={logo}
          alt="Musicart Logo"
          className="w-full h-full object-cover"
        />
      </div>

      <button
        type="button"
        onClick={() => setIsSidebarOpen((prev) => !prev)}
        aria-label={isSidebarOpen ? 'Close Menu' : 'Open Menu'}
        aria-controls="main-navigation"
        aria-expanded={isSidebarOpen}
        className="absolute right-0 top-24 translate-x-1/2 p-2 bg-violet-500 rounded-full cursor-pointer  hover:bg-violet-600 focus:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-slate-300 dark:focus:ring-offset-slate-800 transition-colors duration-200"
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

      <div className="w-full mt-16">
        <Navbar isSidebarOpen={isSidebarOpen} />
      </div>

      <div className="w-full mt-auto">
        <ThemeSwitch isSidebarOpen={isSidebarOpen} />
      </div>
    </aside>
  );
}
