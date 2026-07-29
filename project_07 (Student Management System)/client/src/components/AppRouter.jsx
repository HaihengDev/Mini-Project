import { Routes, Route } from 'react-router-dom';
import {
  mainPageRoutes,
  authRoutes
} from '../config/Routes.jsx';
import ProtectedRoute from "../utils/ProtectedRoute.jsx";
import Error from "../pages/Error.jsx";
import MainLayout from "../layouts/MainLayout.jsx";

export default function AppRouter() {
  return (
    <Routes>
      {authRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          {mainPageRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Route>

      <Route path="*" element={<Error />} />
    </Routes>
  );
}
