import { NavLink } from './NavLink';

interface SidebarLinkProps {
  icon: JSX.Element;
  text: string;
}

export function SidebarLink({ icon, text }: SidebarLinkProps) {
  return (
    <NavLink.Root>
      <NavLink.Link>
        <NavLink.Icon icon={icon} />
        <NavLink.Text>{text}</NavLink.Text>
      </NavLink.Link>
    </NavLink.Root>
  );
}
