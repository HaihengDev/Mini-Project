import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SideBar from './components/SideBar.jsx';
import AppRouter from './components/AppRouter.jsx';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { pathname } = useLocation();
  const isLoginPage = pathname === '/login';

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  if (isLoginPage) {
    return <AppRouter />;
  }

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
