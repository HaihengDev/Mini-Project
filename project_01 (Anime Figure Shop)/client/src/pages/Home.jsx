import { useOutletContext } from 'react-router-dom';
import { Hook } from '../api/Hook.js';
import CardLayout from '../components/CardLayout.jsx';

export default function Home() {
  const products = Hook();
  const { handleAddToCart } = useOutletContext();

  return (
    <>
      <CardLayout products={products} handleAddToCart={handleAddToCart} />
    </>
  );
}
