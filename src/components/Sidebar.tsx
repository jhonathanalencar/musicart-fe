import { useState } from 'react';
import { House, Planet, Playlist, CaretLeft, CaretRight } from 'phosphor-react';

import { cn } from '../utils/classNames';

import { SidebarLink } from './SidebarLink';

export function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <aside
      className={cn(
        'py-2 fixed top-0 left-0 h-full bg-slate-800/60 backdrop-blur drop-shadow-md',
        isSidebarOpen ? 'w-60' : 'w-fit'
      )}
    >
      <button
        type="button"
        onClick={() => setIsSidebarOpen((prev) => !prev)}
        aria-label={isSidebarOpen ? 'Close Menu' : 'Open Menu'}
        aria-controls="main-navigation"
        aria-expanded={isSidebarOpen}
        className="absolute right-0 translate-x-1/2 p-2 bg-violet-500 rounded-full cursor-pointer hover:bg-violet-600 focus:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-colors duration-200"
      >
        {isSidebarOpen ? (
          <CaretLeft weight="bold" className="h-6 w-6 text-slate-900" />
        ) : (
          <CaretRight weight="bold" className="h-6 w-6 text-slate-900" />
        )}
      </button>

      <nav id="main-navigation" className="pt-16 transition-all duration-200">
        <ul aria-label="main" className="flex flex-col gap-3">
          <SidebarLink
            icon={<House weight="bold" />}
            text="Home"
            isSidebarOpen={isSidebarOpen}
          />
          <SidebarLink
            icon={<Planet weight="bold" />}
            text="Explore"
            isSidebarOpen={isSidebarOpen}
          />
          <SidebarLink
            icon={<Playlist weight="bold" />}
            text="Genres"
            isSidebarOpen={isSidebarOpen}
          />
        </ul>
      </nav>
    </aside>
  );
}
