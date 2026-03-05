import { useState, useEffect } from 'react';

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
    <div>
      <h1>Home</h1>
      {products.map((p) => (
        <p key={p._id}>{p.name}</p>
      ))}
    </div>
  );
}
