import { useState, useEffect, useCallback } from 'react';
import { getAll, create } from '../endpoints/api.js';
import { studentTableHeader } from '../config/config.js';
import { handleExport } from '../services/handleExport.js';
import { studentInput } from '../config/input.js';
import { ageCalculation } from '../utils/ageCalculation.js';
import { formatDate } from '../utils/formatDate.js';
import InputForm from '../components/InputForm.jsx';
import TableHeader from '../components/TableHeader.jsx';

const Page = () => {
  const [rooms, setRooms] = useState([]);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchStudents = useCallback(async () => {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error('Fetch failed (request time out)!')),
        3000,
      ),
    );

    const data = await Promise.race([getAll('students'), timeoutPromise]);

    setStudents(data.students ?? []);
  }, []);

  useEffect(() => {
    async function loadStudents() {
      try {
        await fetchStudents();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadStudents();
  }, [fetchStudents]);

  useEffect(() => {
    async function fetchAllRooms() {
      try {
        const data = await getAll('rooms');
        setRooms(data.rooms ?? []);
      } catch (err) {
        throw new Error('Fetch all class failed!', { cause: err });
      }
    }

    fetchAllRooms();
  }, []);

  const roomsOption = rooms.map((room) => ({
    value: room.class_id,
    label: `${room.class_name} (${room.academic_year})`,
  }));

  const studentFormInput = studentInput.map((input) => {
    if (input.id === 'class_id') {
      return {
        ...input,
        options: roomsOption,
      };
    }

    return input;
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <h2>Loading students...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-card">
          <div className="error-icon">⚠️</div>
          <h2>Oops!</h2>
          <p>{error}</p>

          <button
            className="btn-retry"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const handleCreateStudent = async (event) => {
    event.preventDefault();
    setSubmitError('');
    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);

      const first_name = formData.get('first_name');
      const last_name = formData.get('last_name');
      const dob = formData.get('dob');
      const gender = formData.get('gender');
      const class_id = formData.get('class_id');
      const photo_url = formData.get('photo_url');

      const data = {
        first_name,
        last_name,
        dob,
        gender,
        class_id,
        photo_url
      };

      await create('students', data);

      await fetchStudents();

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
              <h2>Add Student</h2>

              <button className="modal-close" onClick={() => setIsOpen(false)}>
                ✕
              </button>
            </div>

            <div className="modal-body">
              <InputForm
                formId={'create-student-form'}
                inputElements={studentFormInput}
                onSubmit={handleCreateStudent}
              />

              {submitError && <p className={'form-error'}>{submitError}</p>}
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
                form={'create-student-form'}
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
            onClick={() => handleExport('students')}
            className="btn-export"
          >
            Export
          </button>
        </div>
      </div>

      <table>
        <thead>
          <TableHeader headerRows={studentTableHeader} />
        </thead>

        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan={studentTableHeader.length}>Student is empty!</td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.studentId}>
                <td>{student.student_id}</td>
                <td>{student.first_name}</td>
                <td>{student.last_name}</td>
                <td>{formatDate(student.dob)}</td>
                <td>{student.gender}</td>
                <td>{ageCalculation(student.dob)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
};

export default Page;
