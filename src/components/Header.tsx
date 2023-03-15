import { useEffect, useState } from 'react';
import { List, MagnifyingGlass, X } from 'phosphor-react';

import { useMediaQuery } from '../hooks/useMediaQuery';
import logo from '../assets/musicart-logo.png';

import { Navbar } from './Navbar';
import { ThemeSwitch } from './ThemeSwitch';

const buttonStyles =
  'rounded-md text-lg font-semibold py-2 w-full min-w-32 bg-violet-500 text-gray-100 hover:bg-violet-600 focus:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-slate-200 dark:focus:ring-offset-slate-800 transition-colors';
const iconStyles =
  'text-slate-500 dark:text-slate-300 rounded-md hover:text-violet-500 dark:hover:text-teal-500 focus:text-violet-500 dark:focus:text-teal-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-slate-200 dark:focus:ring-offset-[#121214] transition-colors duration-300';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const isBelowMediumScreens = useMediaQuery('(max-width: 50em)');

  useEffect(() => {
    function handleCloseSidebarOnPressEscape(e: KeyboardEvent) {
      if (isOpen && e.key === 'Escape') {
        setIsOpen(false);
      }
    }

    window.addEventListener('keydown', handleCloseSidebarOnPressEscape);

    return () => {
      window.removeEventListener('keydown', handleCloseSidebarOnPressEscape);
    };
  }, [isOpen]);

  return (
    <header className="w-full h-24 px-4 bg-slate-200/60 dark:bg-[#121214]/60 backdrop-blur-sm drop-shadow-md">
      <div className="w-full h-full max-w-[1400px] mx-auto flex items-center justify-between">
        {isBelowMediumScreens ? (
          <button
            onClick={() => setIsOpen(true)}
            className={iconStyles}
            aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
            aria-controls="main-navigation"
            aria-expanded={isOpen}
          >
            <List weight="bold" className="h-8 w-8" />
          </button>
        ) : null}

        {isOpen && isBelowMediumScreens ? (
          <div className="fixed top-0 left-0 flex w-full h-screen">
            <div className="bg-slate-200 dark:bg-slate-800 w-64 flex flex-col gap-8">
              <button
                onClick={() => setIsOpen(false)}
                className="self-end m-1 p-2 rounded-full text-slate-600 dark:text-slate-200 hover:text-violet-500 dark:hover:text-teal-500 focus:text-violet-500 dark:focus:text-teal-500 focus:outline-none focus:ring-2 focus:ring-violet-900 dark:focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-slate-200 dark:focus:ring-offset-slate-800 transition-colors duration-200"
              >
                <X weight="bold" className="h-6 w-6" />
              </button>

              <Navbar isSidebarOpen={isOpen} />

              <div className="flex flex-col items-center gap-4 w-full px-2">
                <button className={buttonStyles}>Sign up</button>
                <button className={buttonStyles}>Log in</button>
              </div>

              <div className="w-full pl-2 mt-6">
                <ThemeSwitch isSidebarOpen={isOpen} />
              </div>
            </div>

            <div
              onClick={() => setIsOpen(false)}
              role="presentation"
              className="h-full w-full flex flex-1 bg-black/50"
            />
          </div>
        ) : null}

        {isBelowMediumScreens ? (
          <div className="h-16 w-16">
            <img
              src={logo}
              alt="Musicart logo"
              className="w-full h-full object-cover"
            />
          </div>
        ) : null}

        {isBelowMediumScreens ? (
          <button className="text-slate-500 dark:text-slate-300 rounded-md hover:text-violet-500 dark:hover:text-teal-500 focus:text-violet-500 dark:focus:text-teal-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-slate-200 dark:focus:ring-offset-[#121214] transition-colors duration-300">
            <MagnifyingGlass weight="bold" className="h-8 w-8" />
          </button>
        ) : (
          <input type="text" placeholder="search" />
        )}

        {!isBelowMediumScreens ? (
          <div className="flex w-[272px] gap-4">
            <button className={buttonStyles}>Sign up</button>
            <button className={buttonStyles}>Log in</button>
          </div>
        ) : null}
      </div>
    </header>
  );
}
