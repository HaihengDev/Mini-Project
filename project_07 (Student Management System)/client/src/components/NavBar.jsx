import { NavLink } from 'react-router-dom';
import { navBar } from '../config/config.js';
import './style/nav-bar.css';

export default function NavBar() {
  return (
    <nav>
      {Object.entries(navBar).map(([label, path]) => (
        <NavLink
          to={path}
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
