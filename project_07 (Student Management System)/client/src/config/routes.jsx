import Home from '../pages/Home.jsx';
import Room from '../pages/Room.jsx';
import Course from '../pages/Course.jsx';
import Teacher from '../pages/Teacher.jsx';
import Student from '../pages/Student.jsx';

export const routes = [
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/room',
    element: <Room />,
  },
  {
    path: '/course',
    element: <Course />,
  },
  {
    path: '/teacher',
    element: <Teacher />,
  },
  {
    path: '/student',
    element: <Student />,
  },
];
