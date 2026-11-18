import type { ReactElement } from 'react';

export interface INavbarRoutes {
  path: string;
  label: string;
}

export interface IRoutes {
  path: string;
  element: ReactElement;
}
