import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Cart from './pages/Cart.jsx';
import Admin from './pages/Admin.jsx';
import LearnMore from './pages/LearnMore.jsx';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: '/cart', element: <Cart /> },
      { path: '/admin', element: <Admin /> },
    ],
  },

  {
    path: '/:id',
    element: <LearnMore />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
);
