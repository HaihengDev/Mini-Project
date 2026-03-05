import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import NavBar from './components/NavBar.jsx';

const App = () => {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <>
      <header>
        <NavBar cartCount={cart.length} />
      </header>

      <main>
        <Outlet context={{ cart, handleAddToCart, setCart }} />
      </main>
    </>
  );
};

export default App;
