import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import Itachi from '../assets/Itachi.png';
import Logo from '../assets/logo.png';

export default function NavBar() {
  return (
    <nav className="w-full flex justify-between items-center px-6 py-2">
      <figure className="w-[100px] h-[100px]">
        <img src={Logo} alt="Logo for website" className="w-full h-full" />
      </figure>

      <section className="flex items-center gap-6">
        {/* Cart */}
        <div className="relative">
          <FontAwesomeIcon icon={faCartArrowDown} className="text-3xl" />

          <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            0
          </span>
        </div>

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
