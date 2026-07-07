import { useState } from 'react';
import FormInput from '../components/FormInput.jsx';
import TableHeader from '../components/TableHeader.jsx';
import { courseForm } from '../config/inputForm.js';
import { courseTableHeader } from '../config/tableConfig.js';

export default function Page() {
  const [showForm, setShowForm] = useState(false);

  return (
    <section id="container">
      <div className="table-container">
        <table>
          <TableHeader
            tableHeader={courseTableHeader}
            onAdd={() => setShowForm(true)}
          />
          <tbody></tbody>
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

            {courseForm.map((field) => (
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
}
