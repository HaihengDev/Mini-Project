import { useCallback, useEffect, useState } from 'react';
import UploadForm from './components/uploadForm';

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProducts = useCallback(async () => {
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/products');
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || 'Failed to fetch products');
      }

      setProducts(result);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <main className="app-shell">
      <section>
        <h1>Cloud Product Upload</h1>
        <p className="subtext">Upload products and store images in Cloudflare R2.</p>
      </section>

      <UploadForm onCreated={loadProducts} />

      <section className="card">
        <div className="products-head">
          <h2>Products</h2>
          <button onClick={loadProducts} type="button" className="ghost">
            Refresh
          </button>
        </div>

        {loading && <p>Loading products...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && products.length === 0 && <p>No products yet.</p>}

        {!loading && !error && products.length > 0 && (
          <div className="products-grid">
            {products.map((product) => (
              <article className="product" key={product.id}>
                <img src={product.imgUrl} alt={product.name} />
                <h3>{product.name}</h3>
                <p>ID: {product.id}</p>
                <p>Price: ${Number(product.price).toFixed(2)}</p>
                <p>Discount: {Number(product.discount)}%</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default App;
