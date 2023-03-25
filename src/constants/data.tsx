import { House, Planet, Playlist } from 'phosphor-react';

export const sidebarLinksData = [
  {
    text: 'Home',
    icon: <House weight="bold" />,
    href: '/',
  },
  {
    text: 'Explore',
    icon: <Planet weight="bold" />,
    href: '/explore',
  },
  {
    text: 'Genres',
    icon: <Playlist weight="bold" />,
    href: '/genres',
  },
];
