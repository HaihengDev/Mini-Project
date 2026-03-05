import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';

const App = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default App;
