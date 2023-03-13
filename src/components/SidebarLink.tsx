import { cn } from '../utils/classNames';

import { NavLink } from './NavLink';

interface SidebarLinkProps {
  icon: JSX.Element;
  text: string;
}

export function SidebarLink({ icon, text }: SidebarLinkProps) {
  const activeStyles =
    'before:absolute before:left-0 before:top-0 before:h-5 before:w-5 before:bg-teal-300 before:blur-xl';

  const isActive = false;

  return (
    <NavLink.Root className={cn('py-2 relative', isActive ? activeStyles : '')}>
      <NavLink.Link
        href="/"
        className="pl-6 flex items-center gap-4 group border-l-2 border-l-teal-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-slate-800"
      >
        <NavLink.Icon
          icon={icon}
          className={cn(
            'h-6 w-6 group-hover:text-teal-500 group-focus:text-teal-500',
            isActive ? 'text-teal-500' : 'text-gray-300'
          )}
        />
        <NavLink.Text
          className={cn(
            'text-lg font-semibold group-hover:text-teal-500 group-focus:text-teal-500',
            isActive ? 'text-teal-500' : 'text-gray-300'
          )}
        >
          {text}
        </NavLink.Text>
      </NavLink.Link>
    </NavLink.Root>
  );
}
