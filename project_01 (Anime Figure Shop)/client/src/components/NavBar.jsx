import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Itachi from '../assets/Itachi.png';
import Logo from '../assets/logo.png';

export default function NavBar({ cartCount = 0 }) {
  return (
    <nav className="w-full flex justify-between items-center px-6 py-2">
      <Link to="/" className="w-[100px] h-[100px] block">
        <figure className="w-full h-full">
          <img src={Logo} alt="Logo for website" className="w-full h-full" />
        </figure>
      </Link>

      <section className="flex items-center gap-6">
        {/* Cart */}
        <Link to="/cart" className="relative">
          <FontAwesomeIcon icon={faCartArrowDown} className="text-3xl" />

          <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {cartCount}
          </span>
        </Link>

        {/* Profile */}
        <div className="w-[40px] h-[40px]">
          <img
            src={Itachi}
            alt="Profile Picture"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </section>
    </nav>
  );
}
