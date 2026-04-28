import { useState } from 'react';

const initialForm = {
  id: '',
  name: '',
  price: '',
  discount: '',
  file: null,
};

const UploadForm = ({ onCreated }) => {
  const [form, setForm] = useState(initialForm);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0] ?? null;
    setForm((prev) => ({ ...prev, file: selectedFile }));

    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!form.file) {
      setError('Please select an image file.');
      return;
    }

    setLoading(true);

    try {
      const payload = new FormData();
      payload.append('id', form.id.trim());
      payload.append('name', form.name.trim());
      payload.append('price', form.price);
      payload.append('discount', form.discount);
      payload.append('file', form.file);

      const response = await fetch('/api/products', {
        method: 'POST',
        body: payload,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || 'Upload failed');
      }

      setForm(initialForm);
      setPreview('');
      onCreated();
    } catch (err) {
      setError(err.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>Add Product</h2>

      <label>
        Product ID
        <input
          type="text"
          name="id"
          placeholder="PRD-1001"
          value={form.id}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Name
        <input
          type="text"
          name="name"
          placeholder="Wireless Mouse"
          value={form.name}
          onChange={handleChange}
          required
        />
      </label>

      <div className="grid">
        <label>
          Price
          <input
            type="number"
            name="price"
            placeholder="29.99"
            min="0"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Discount (%)
          <input
            type="number"
            name="discount"
            placeholder="10"
            min="0"
            max="100"
            step="0.01"
            value={form.discount}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <label>
        Product Image
        <input type="file" accept="image/*" onChange={handleFileChange} required />
      </label>

      {preview && <img className="preview" src={preview} alt="Product preview" />}

      {error && <p className="error">{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? 'Uploading...' : 'Create Product'}
      </button>
    </form>
  );
};

export default UploadForm;
