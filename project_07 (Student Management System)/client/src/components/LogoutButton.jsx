import {useNavigate} from "react-router-dom";
import './style/logout-button.css';

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    navigate('/login');
  }

  return <button className={'logout-button'} onClick={handleLogout}>
    Logout
  </button>
}