import type {ReactElement} from 'react';
import { Routes, Route } from 'react-router-dom';
import { routes } from '../config/Routes';
import type {IRoutes} from "../types/route.type.ts";

export default function AppRouter(): ReactElement {
  return <Routes>
    {routes.map((route: IRoutes): ReactElement => (
      <Route
        key={route.path}
        {...route}
      />
    ))}
  </Routes>;
}
