import { Routes, Route } from 'react-router-dom';
import routes from '../config/Routes.jsx';

export default function AppRouter() {
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}
