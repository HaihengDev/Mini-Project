import { useState, useEffect } from 'react';
import { teacherTableHeader } from '../config/config.js';
import { teacherInput } from '../config/input.js';
import { handleExport } from '../services/handleExport.js';
import TableHeader from '../components/TableHeader.jsx';
import InputForm from '../components/InputForm.jsx';

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateTeacher = async (event) => {
    event.preventDafault();
    setSubmitError('');
    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);

      const employee_no = formData.get('employee_no');
      const user_id = formData.get('user_id');
      const first_name = formData.get('first_name');
      const last_name = formData.get('last_name');
      const gender = formData.get('gender');
      const phone = formData.get('phone');
      const joining_date = formData.get('joining_date');

      await create('teachers', {
        employee_no,
        user_id,
        first_name,
        last_name,
        gender,
        phone,
        joining_date,
      });

      setIsOpen(false);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="page-container">
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add Teacher</h2>

              <button className="modal-close" onClick={() => setIsOpen(false)}>
                x
              </button>
            </div>

            <div className="modal-body">
              <InputForm
                formId="create-teacher-form"
                inputElements={teacherInput}
                onSubmit={handleCreateTeacher}
              />

              {submitError && <p className="form-error">{submitError}</p>}
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>

              <button
                className="btn btn-primary"
                disabled={isSubmitting}
                form="create-teacher-form"
                type="submit"
              >
                {isSubmitting ? 'Inserting...' : 'Insert'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="table-toolbar" style={{ justifyContent: 'flex-end' }}>
        <div className="table-actions">
          <button onClick={() => setIsOpen(true)}>Add</button>

          <button
            onClick={() => handleExport('teachers')}
            className="btn-export"
          >
            Export
          </button>
        </div>
      </div>

      <table>
        <thead>
          <TableHeader headerRows={teacherTableHeader} />
        </thead>

        <tbody>
          <tr>
            <td colSpan={teacherTableHeader.length}>No Teacher Found!</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default Page;
