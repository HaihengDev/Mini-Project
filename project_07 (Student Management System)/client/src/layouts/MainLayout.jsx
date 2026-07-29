import {useState} from 'react';
import {Outlet} from 'react-router-dom';
import SideBar from '../components/SideBar.jsx';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  }

  return <div className="app-layout">
    <SideBar
      isOpen={isSidebarOpen}
      toggleSidebar={toggleSidebar}
    />

    {isSidebarOpen && (
      <div
        className="sidebar-overlay"
        onClick={toggleSidebar}
      />
    )}

    <main
      className={`main-content ${
        isSidebarOpen
        ? 'sidebar-open' : 'sidebar-closed'
      }`}
    >
      {!isSidebarOpen && (
        <button
          className="menu-toggle"
          onClick={toggleSidebar}
          aria-label="Open sidebar"
        >
          ☰
        </button>
      )}

      <Outlet />
    </main>
  </div>
}

export default MainLayout;