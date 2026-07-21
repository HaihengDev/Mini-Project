import { NavLink } from 'react-router-dom';
import { navBar } from '../config/config.js';
import './style/side-bar.css';

export default function NavBar({ isOpen, toggleSidebar }) {
  return (
    <aside className={isOpen ? 'sidebar open' : 'sidebar closed'}>
      <div className="sidebar-header">
        <h2>SMS</h2>

        <button
          className="sidebar-close"
          onClick={toggleSidebar}
          aria-label="Close sidebar"
        >
          x
        </button>
      </div>

      <nav className="sidebar-nav">
        {Object.entries(navBar).map(([label, path]) => (
          <NavLink
            to={path}
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
            onClick={() => {
              if (window.innerWidth <= 768) {
                toggleSidebar();
              }
            }}
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
