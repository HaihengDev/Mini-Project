import { useState, useEffect } from 'react';
import Card from '../components/Card.jsx';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        return res.json();
      })
      .then((payload) =>
        setProducts(Array.isArray(payload?.data) ? payload.data : []),
      )
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p, index) => (
        <Card
          key={p._id}
          index={index}
          name={p.name}
          stock={p.stock}
          price={p.price}
        />
      ))}
    </div>
  );
}
