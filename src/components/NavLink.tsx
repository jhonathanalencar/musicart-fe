import {
  cloneElement,
  HTMLAttributes,
  LiHTMLAttributes,
  ReactNode,
} from 'react';
import { NavLink as Link, NavLinkProps } from 'react-router-dom';

interface NavLinkRootProps extends LiHTMLAttributes<HTMLLIElement> {
  children: ReactNode;
}

function NavLinkRoot({ children, ...rest }: NavLinkRootProps) {
  return <li {...rest}>{children}</li>;
}

interface NavLinkLinkProps extends NavLinkProps {
  children: ReactNode;
}

function NavLinkLink({ children, ...rest }: NavLinkLinkProps) {
  return <Link {...rest}>{children}</Link>;
}

interface NavLinkIconProps {
  icon: JSX.Element;
  className?: string;
}

function NavLinkIcon({ icon, className }: NavLinkIconProps) {
  return cloneElement(icon, { className });
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
