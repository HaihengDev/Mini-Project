import { useState } from 'react';
import TableHeader from '../components/TableHeader.jsx';
import FormInput from '../components/FormInput.jsx';
import { teacherTableHeader } from '../config/tableConfig.js';
import { teacherForm } from '../config/inputForm.js';

const Page = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <section id="container">
      <div className="table-container">
        <table>
          <TableHeader
            tableHeader={teacherTableHeader}
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

            {teacherForm.map((field) => (
              <FormInput key={field.id} {...field} />
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
