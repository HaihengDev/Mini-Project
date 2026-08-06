import Home from '../pages/Home.jsx';
import Student from '../pages/Student.jsx';
import Teacher from '../pages/Teacher.jsx';
import Room from '../pages/Room.jsx';
import Course from '../pages/Course.jsx';
import Login from '../pages/Login.jsx';
import ForgotPassword from '../pages/ForgotPassword.jsx';
import VerifyOtp from '../pages/VerifyOtp.jsx';
import ResetPassword from '../pages/ResetPassword.jsx';

export const mainPageRoutes = [
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
    path: '/classes',
    element: <Room />,
  },
  {
    path: '/courses',
    element: <Course />,
  },
];

export const authRoutes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/verify-otp',
    element: <VerifyOtp />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
];
