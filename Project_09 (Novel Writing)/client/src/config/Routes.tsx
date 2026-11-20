import HomePage from '../pages/HomePage';
import NovelPage from '../pages/NovelPage';
import CommunityPage from '../pages/CommunityPage';
import NotFoundPage from '../pages/NotFoundPage';

export const routes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
  {
    path: '/novel',
    element: <NovelPage />,
  },
  {
    path: '/community',
    element: <CommunityPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export const navbarRoutes = [
  {
    path: '/',
    label: 'Home',
  },
  {
    path: '/novel',
    label: 'Novel',
  },
  {
    path: '/community',
    label: 'Communtity',
  },
];
