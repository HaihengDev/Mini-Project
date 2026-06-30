import { NavLink } from 'react-router-dom';
import { navBar } from '../config/config.js';

export default function NavBar() {
  return (
    <nav>
      {Object.entries(navBar).map(([label, path]) => (
        <NavLink key={`${path}-${label}`} to={path}>
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
