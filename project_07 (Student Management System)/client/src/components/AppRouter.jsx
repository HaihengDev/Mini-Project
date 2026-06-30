import { Routes, Route } from 'react-router-dom';
import { routes } from '../config/routes.jsx';

export default function AppRouter() {
  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={`${route.path}-${route.element}`}
          path={route.path}
          element={route.element}
        />
      ))}
    </Routes>
  );
}
