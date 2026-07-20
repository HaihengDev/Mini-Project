import Home from '../pages/Home.jsx';
import MainPage from '../components/MainPage.jsx';
import Teacher from '../pages/Teacher.jsx';
import Room from '../pages/Room.jsx';
import Course from '../pages/Course.jsx';
import { studentInput } from './input.js';
import { studentTableHeader } from './config.js';

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/students',
    element: (
      <MainPage
        path="students"
        inputElement={studentInput}
        headerRows={studentTableHeader}
      />
    ),
  },
  {
    path: '/teachers',
    element: <Teacher />,
  },
  {
    path: '/rooms',
    element: <Room />,
  },
  {
    path: '/courses',
    element: <Course />,
  },
];

export default routes;
