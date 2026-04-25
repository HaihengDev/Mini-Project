import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

type FormState = {
  name: string;
  price: string;
  stock: string;
};

export default function UploadForm() {
  const [form, setForm] = useState<FormState>({
    name: '',
    price: '',
    stock: '',
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // text inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // file input
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('product_name', form.name);
    formData.append('price', form.price);
    formData.append('quantity_in_stock', form.stock);

    if (image) {
      formData.append('image', image); // MUST match multer field name
    }

    try {
      const res = await fetch('http://localhost:8888/api/products', {
        method: 'POST',
        body: formData, // no headers needed
      });

      const data = await res.json();
      console.log(data);

      alert('Product created successfully!');
    } catch (error) {
      console.error(error);
      alert('Upload failed!');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Create Product</h2>

      <form onSubmit={handleSubmit}>
        {/* NAME */}
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          required
        />

        {/* IMAGE FILE */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />

        {/* PREVIEW */}
        {preview && (
          <img
            src={preview}
            alt="preview"
            style={{ width: '100%', marginTop: '10px' }}
          />
        )}

        {/* PRICE */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          required
        />

        {/* STOCK */}
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          onChange={handleChange}
          required
        />

        <button type="submit" style={{ marginTop: '10px' }}>
          Upload Product
        </button>
      </form>
    </div>
  );
}
