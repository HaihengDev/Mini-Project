import {Routes, Route, Navigate} from 'react-router-dom';
import routes from '../config/Routes.jsx';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate
        to='/login' replace
      />} />
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}
