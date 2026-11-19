import type { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import './style/header.css';

interface Props {
  path: string;
  label: string;
}

export default function Link({ path, label }: Props): ReactElement {
  return (
    <NavLink
      to={path}
      className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
    >
      {label}
    </NavLink>
  );
}
