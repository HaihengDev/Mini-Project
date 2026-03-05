import { useParams } from 'react-router-dom';
import { Hook } from '../api/Hook.js';

export default function LearnMore() {
  const { id } = useParams();
  const products = Hook();
  const product = products.find((p) => p._id === id);

  if (!product) return <p>Product not found!</p>;

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p>ID: {product._id}</p>
      <p>Price: ${product.price}</p>
      <p>Stock: {product.stock}</p>
    </section>
  );
}
