import BrandName from './BrandName';
import Navbar from './Navbar';
import '../style/header.css';

export default function Header() {
  return (
    <header>
      <BrandName />

      <Navbar />
    </header>
  );
}
