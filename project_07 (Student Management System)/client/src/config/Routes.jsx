import Home from '../pages/Home.jsx';
import Student from '../pages/Student.jsx';
import Teacher from '../pages/Teacher.jsx';
import Room from '../pages/Room.jsx';
import Course from '../pages/Course.jsx';
import Login from '../pages/Login.jsx';

const routes = [
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
    path: '/classes',
    element: <Room />,
  },
  {
    path: '/courses',
    element: <Course />,
  },
  {
    path: '/login',
    element: <Login />,
  },
];

export default routes;
