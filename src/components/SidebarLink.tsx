import { cn } from '../utils/classNames';

import { NavLink } from './NavLink';

interface SidebarLinkProps {
  icon: JSX.Element;
  text: string;
  isSidebarOpen: boolean;
}

export function SidebarLink({ icon, text, isSidebarOpen }: SidebarLinkProps) {
  const activeStyles =
    'before:absolute before:left-0 before:top-0 before:h-5 before:w-5 before:bg-yellow-300 dark:before:bg-teal-300 before:blur-xl';

  const isActive = false;

  return (
    <NavLink.Root className={cn('py-2 relative', isActive ? activeStyles : '')}>
      <NavLink.Link
        href="/"
        className={cn(
          'px-6 py-1 flex items-center gap-4 border-x-2 border-x-transparent group focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-slate-200 dark:focus:ring-offset-slate-800',
          isActive
            ? 'border-l-yellow-500 dark:border-l-teal-500'
            : 'border-l-transparent'
        )}
      >
        <NavLink.Icon
          icon={icon}
          className={cn(
            'h-6 w-6 group-hover:text-yellow-500 dark:group-hover:text-teal-500 group-focus:text-yellow-500 dark:group-focus:text-teal-500 transition-colors duration-200',
            isActive
              ? 'text-yellow-500 dark:text-teal-500'
              : 'text-gray-400 dark:text-gray-300'
          )}
        />
        {isSidebarOpen ? (
          <NavLink.Text
            className={cn(
              'text-lg font-semibold group-hover:text-yellow-500 dark:group-hover:text-teal-500 group-focus:text-yellow-500 dark:group-focus:text-teal-500 leading-none transition-colors duration-200 animate-fadeIn',
              isActive
                ? 'text-yellow-500 dark:text-teal-500'
                : 'text-gray-400 dark:text-gray-300'
            )}
          >
            {text}
          </NavLink.Text>
        ) : null}
      </NavLink.Link>
    </NavLink.Root>
  );
}
