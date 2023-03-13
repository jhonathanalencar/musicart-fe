import { NavLink } from './NavLink';
import { House, Planet, Playlist } from 'phosphor-react';
import { SidebarLink } from './SidebarLink';

export function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-full bg-teal-500/60 backdrop-blur drop-shadow-md w-72">
      <div>
        <ul>
          <SidebarLink icon={<House />} text="Home" />
          <NavLink.Root>
            <NavLink.Link>
              <NavLink.Icon icon={<Planet />} />
              <NavLink.Text>Explore</NavLink.Text>
            </NavLink.Link>
          </NavLink.Root>
          <NavLink.Root>
            <NavLink.Link>
              <NavLink.Icon icon={<Playlist />} />
              <NavLink.Text>Genres</NavLink.Text>
            </NavLink.Link>
          </NavLink.Root>
        </ul>
      </div>
    </aside>
  );
}
