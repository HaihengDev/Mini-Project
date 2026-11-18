import type { ReactElement } from 'react';
import type { INavbarRoutes } from '../types/route.type';
import { NavLink } from 'react-router-dom';
import { navbarRoutes } from '../config/Routes';
import './style/header.css';

export default function Navbar(): ReactElement {
  return (
    <nav>
      {navbarRoutes.map(
        (route: INavbarRoutes): ReactElement => (
          <NavLink
            key={route.path}
            to={route.path}
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            {route.label}
          </NavLink>
        ),
      )}
    </nav>
  );
}
