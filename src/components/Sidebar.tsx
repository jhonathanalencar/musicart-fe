import { House, Planet, Playlist } from 'phosphor-react';

import { SidebarLink } from './SidebarLink';

export function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-full bg-slate-800/60 backdrop-blur drop-shadow-md w-64">
      <div className="py-6">
        <ul className="flex flex-col gap-2">
          <SidebarLink icon={<House weight="bold" />} text="Home" />
          <SidebarLink icon={<Planet weight="bold" />} text="Explore" />
          <SidebarLink icon={<Playlist weight="bold" />} text="Genres" />
        </ul>
      </div>
    </aside>
  );
}
