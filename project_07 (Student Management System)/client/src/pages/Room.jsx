import { useState } from 'react';
import { create } from '../endpoints/api.js';
import FormInput from '../components/FormInput.jsx';
import TableHeader from '../components/TableHeader.jsx';
import Alert from '../components/Alert.jsx';
import { roomTableHeader } from '../config/tableConfig.js';
import { roomForm } from '../config/inputForm.js';

const Page = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    roomId: '',
  });
  const [alert, setAlert] = useState(false);

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
      setAlert(true);

      setFormData({
        roomId: '',
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = () => {
    setAlert(false);
  };

  return (
    <section id="container">
      {alert && (
        <div className="alert">
          <Alert text={'Room is created!'} />
          <button onClick={() => setAlert(false)}>X</button>
        </div>
      )}

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
          <form className="form-card" onSubmit={handleSubmit}>
            <h2>Add Room</h2>

            {roomForm.map((field) => (
              <FormInput
                key={field.id}
                {...field}
                value={formData[field.id]}
                onChange={handleChange}
              />
            ))}

            <div className="form-buttons">
              <button type="submit">Save</button>
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
