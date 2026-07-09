import { useState } from 'react';
import { create } from '../endpoints/api.js';
import FormInput from '../components/FormInput.jsx';
import TableHeader from '../components/TableHeader.jsx';
import { roomTableHeader } from '../config/tableConfig.js';
import { roomForm } from '../config/inputForm.js';

const Page = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    roomId: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await create('rooms', formData);

      setShowForm(false);

      setFormData({
        roomId: '',
      });
      alert('Room is created!');
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <section id="container">
      <div className="table-container">
        <table>
          <TableHeader
            tableHeader={roomTableHeader}
            onAdd={() => setShowForm(true)}
          />
        </table>
      </div>

      {showForm && (
        <div className="form-overlay">
          <form
            className="form-card"
            onSubmit={(e) => {
              e.preventDefault();
              setShowForm(false);
            }}
          >
            <h2>Add Course</h2>

            {roomForm.map((field) => (
              <FormInput
                key={field.id}
                {...field}
                value={formData[field.id]}
                onChange={handleChange}
              />
            ))}

            <div className="form-buttons">
              <button type="submit" onSubmit={handleSubmit}>
                Save
              </button>
              <button type="button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

export default Page;
