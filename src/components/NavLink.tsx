import {
  AnchorHTMLAttributes,
  cloneElement,
  HTMLAttributes,
  LiHTMLAttributes,
  ReactNode,
} from 'react';

interface NavLinkRootProps extends LiHTMLAttributes<HTMLLIElement> {
  children: ReactNode;
}

function NavLinkRoot({ children, ...rest }: NavLinkRootProps) {
  return <li {...rest}>{children}</li>;
}

interface NavLinkLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}

function NavLinkLink({ children, ...rest }: NavLinkLinkProps) {
  return <a {...rest}>{children}</a>;
}

interface NavLinkIconProps {
  icon: JSX.Element;
}

function NavLinkIcon({ icon }: NavLinkIconProps) {
  return cloneElement(icon);
}

interface NavLinkTextProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

function NavLinkText({ children, ...rest }: NavLinkTextProps) {
  return <span {...rest}>{children}</span>;
}

export const NavLink = {
  Root: NavLinkRoot,
  Link: NavLinkLink,
  Icon: NavLinkIcon,
  Text: NavLinkText,
};
