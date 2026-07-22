import { useState, useEffect } from 'react';
import { getAll } from '../endpoints/api.js';
import { studentTableHeader } from '../config/config.js';
import { handleExport } from '../services/handleExport.js';
import { studentInput } from '../config/input.js';
import InputForm from '../components/InputForm.jsx';
import TableHeader from '../components/TableHeader.jsx';

const Page = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error('Fetch failed (request time out)!')),
            3000,
          ),
        );

        const data = await Promise.race([getAll('students'), timeoutPromise]);

        setStudents(data.students ?? []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, []);

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
              <InputForm inputElements={studentInput} />
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>

              <button className="btn btn-primary">Insert</button>
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
              <td>Student is empty!</td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.studentId}>
                <td>{student.studentId}</td>
                <td>{student.studentFirstName}</td>
                <td>{student.studentLastName}</td>
                <td>{student.gender}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
};

export default Page;
