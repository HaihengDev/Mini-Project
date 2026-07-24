import { useState, useEffect, useCallback } from 'react';
import { teacherTableHeader } from '../config/config.js';
import { teacherInput } from '../config/input.js';
import {formatDate} from "../utils/formatDate.js";
import { getAll, create } from "../endpoints/api.js";
import { handleExport } from '../services/handleExport.js';
import TableHeader from '../components/TableHeader.jsx';
import InputForm from '../components/InputForm.jsx';

const Page = () => {
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchTeachers = useCallback(async() => {
    const timeoutPromise = new Promise((_, reject) => setTimeout(
      () => reject(new Error('Failed to fetch (request timeout)!')),
      10000
    ));

    const data = await Promise.race([getAll('teachers'), timeoutPromise]);

    setTeachers(data.teachers ?? []);
  }, []);

  useEffect(() => {
    async function loadTeachers() {
      try {
        await fetchTeachers();
      } catch(err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadTeachers();
  }, [fetchTeachers])

  const handleCreateTeacher = async (event) => {
    event.preventDefault();

    setSubmitError('');
    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);

      const employee_no = formData.get('employee_no');
      const first_name = formData.get('first_name');
      const last_name = formData.get('last_name');
      const gender = formData.get('gender');
      const phone = formData.get('phone');
      const joining_date = formData.get('joining_date');

      await create('teachers', {
        employee_no,
        first_name,
        last_name,
        gender,
        phone,
        joining_date,
      });

      fetchTeachers();

      setIsOpen(false);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if(loading) {
    return <div className="loading-container">
      <div className="spinner"></div>
      <h2>Loading students...</h2>
    </div>
  }

  if(error) {
    return <div className={"error-container"}>
      <div className={"error-card"}>
        <div className={"error-icon"}>⚠️</div>
        <h2>Oops!</h2>
        <p>{error}</p>

        <button
          className={"btn-retry"}
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    </div>
  }

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
          {teachers.length === 0 ?
            <tr>
              <td colSpan={teacherTableHeader.length}>No Teacher Found!</td>
            </tr>
            :
            teachers.map((teacher) => (
              <tr key={teacher.teacher_id}>
                <td>{teacher.employee_no}</td>
                <td>{teacher.first_name}</td>
                <td>{teacher.last_name}</td>
                <td>{teacher.gender}</td>
                <td>{teacher.phone}</td>
                <td>{formatDate(teacher.joining_date)}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </section>
  );
};

export default Page;
