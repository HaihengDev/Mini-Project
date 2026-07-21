import { useState } from 'react';
import SideBar from './components/SideBar.jsx';
import AppRouter from './components/AppRouter.jsx';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="app-layout">
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar} />
      )}

      <main
        className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}
      >
        {!isSidebarOpen && (
          <button
            className="menu-toggle"
            onClick={toggleSidebar}
            aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            ☰
          </button>
        )}
        <AppRouter />
      </main>
    </div>
  );
};

export default App;
