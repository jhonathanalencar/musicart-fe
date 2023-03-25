import { sidebarLinksData } from '../constants/data';

import { SidebarLink } from './SidebarLink';

interface NavbarProps {
  isSidebarOpen: boolean;
}

export function Navbar({ isSidebarOpen }: NavbarProps) {
  return (
    <nav id="main-navigation">
      <ul aria-label="main" className="flex flex-col gap-3 w-full">
        {sidebarLinksData.map((link, index) => {
          return (
            <SidebarLink
              key={`${index}-${link.text}`}
              icon={link.icon}
              text={link.text}
              isSidebarOpen={isSidebarOpen}
              link={link.href}
            />
          );
        })}
      </ul>
    </nav>
  );
}
