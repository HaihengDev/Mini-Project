import { useState } from 'react';
import axios from 'axios';

export default function Admin() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); // optional preview

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('image', image);

    try {
      await axios.post('http://localhost:8000/api/products', formData);
      alert('Product uploaded!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Admin Upload Product</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setImage(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0])); // optional preview
          }}
          required
        />
        {preview && <img src={preview} alt="Preview" width="150" />}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Upload Product
        </button>
      </form>
    </section>
  );
}
