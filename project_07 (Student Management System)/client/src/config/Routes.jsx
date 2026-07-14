import Home from '../pages/Home.jsx';
import Student from '../pages/Student.jsx';
import Teacher from '../pages/Teacher.jsx';
import Room from '../pages/Room.jsx';
import Course from '../pages/Course.jsx';

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
    element: <Student />,
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
    path: '/course',
    element: <Course />,
  },
];

export default routes;
