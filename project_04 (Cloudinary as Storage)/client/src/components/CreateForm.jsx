import { useCallback, useEffect, useMemo, useState } from "react";

const initialForm = {
  product_id: "",
  product_name: "",
  price: "",
  discount: "",
};

export default function CreateForm() {
  const [form, setForm] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const imagePreview = useMemo(() => {
    if (!image) {
      return "";
    }
    return URL.createObjectURL(image);
  }, [image]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const fetchProducts = useCallback(async () => {
    try {
      setLoadingProducts(true);
      setErrorMessage("");
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("Unable to load products.");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setErrorMessage(error.message || "Failed to fetch products.");
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onImageChange = (event) => {
    const selectedFile = event.target.files?.[0] || null;
    setImage(selectedFile);
  };

  const resetForm = () => {
    setForm(initialForm);
    setImage(null);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const payload = new FormData();
      payload.append("product_id", form.product_id);
      payload.append("product_name", form.product_name);
      payload.append("price", form.price);
      payload.append("discount", form.discount);
      if (image) {
        payload.append("image", image);
      }

      const response = await fetch("/api/products", {
        method: "POST",
        body: payload,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message || "Unable to create product.");
      }

      setSuccessMessage("Product created successfully.");
      resetForm();
      await fetchProducts();
    } catch (error) {
      setErrorMessage(error.message || "Create product failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app-shell">
      <section className="panel">
        <header className="panel-header">
          <h1>New Product</h1>
          <p>Create a product and upload its image to Cloudinary.</p>
        </header>

        <form className="product-form" onSubmit={onSubmit}>
          <label>
            Product ID
            <input
              type="text"
              name="product_id"
              placeholder="e.g. 1001"
              value={form.product_id}
              onChange={onInputChange}
              required
            />
          </label>

          <label>
            Product Name
            <input
              type="text"
              name="product_name"
              placeholder="e.g. Wireless Keyboard"
              value={form.product_name}
              onChange={onInputChange}
              required
            />
          </label>

          <label>
            Price
            <input
              type="number"
              name="price"
              min="0"
              step="0.01"
              placeholder="e.g. 59.99"
              value={form.price}
              onChange={onInputChange}
              required
            />
          </label>

          <label>
            Discount (%)
            <input
              type="number"
              name="discount"
              min="0"
              max="100"
              step="1"
              placeholder="e.g. 10"
              value={form.discount}
              onChange={onInputChange}
              required
            />
          </label>

          <label>
            Product Image
            <input type="file" accept="image/*" onChange={onImageChange} />
          </label>

          {imagePreview ? (
            <img className="image-preview" src={imagePreview} alt="Preview" />
          ) : null}

          <button type="submit" disabled={submitting}>
            {submitting ? "Creating..." : "Create Product"}
          </button>

          {successMessage ? <p className="status success">{successMessage}</p> : null}
          {errorMessage ? <p className="status error">{errorMessage}</p> : null}
        </form>
      </section>

      <section className="panel">
        <header className="panel-header">
          <h2>Products</h2>
          <button type="button" onClick={fetchProducts} disabled={loadingProducts}>
            {loadingProducts ? "Refreshing..." : "Refresh"}
          </button>
        </header>

        {loadingProducts ? (
          <p className="status">Loading products...</p>
        ) : (
          <div className="product-grid">
            {products.length === 0 ? (
              <p className="status">No products found.</p>
            ) : (
              products.map((product) => (
                <article key={product.id} className="product-card">
                  <div className="product-image-wrap">
                    {product.imgUrl ? (
                      <img src={product.imgUrl} alt={product.name} className="product-image" />
                    ) : (
                      <div className="product-image-placeholder">No Image</div>
                    )}
                  </div>
                  <h3>{product.name}</h3>
                  <p>ID: {product.id}</p>
                  <p>Price: ${Number(product.price || 0).toFixed(2)}</p>
                  <p>Discount: {product.discount}%</p>
                </article>
              ))
            )}
          </div>
        )}
      </section>
    </div>
  );
}
