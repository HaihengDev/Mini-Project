import type { ReactElement } from 'react';
import type { INavbarRoutes } from '../../types/route.type';
import { navbarRoutes } from '../../config/Routes';
import Link from './Link';
import './style/header.css';

export default function Navbar(): ReactElement {
  return (
    <nav>
      {navbarRoutes.map(
        (route: INavbarRoutes): ReactElement => (
          <Link key={route.path} {...route} />
        ),
      )}
    </nav>
  );
}
