import { Routes, Route } from 'react-router-dom';
import routes from '../config/Routes.jsx';
import ProtectedRoute from "../utils/ProtectedRoute.jsx";
import Login from '../pages/Login.jsx';
import Error from "../pages/Error.jsx";
import MainLayout from "../layouts/MainLayout.jsx";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}/>

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Route>

      <Route path="*" element={<Error />} />
    </Routes>
  );
}
