import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Cart from './pages/Cart.jsx';

const routes = createBrowserRouter([
  {
    path: '/',
    children: [
      { index: true, children: <Home /> },
      { path: '/cart', children: <Cart /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
