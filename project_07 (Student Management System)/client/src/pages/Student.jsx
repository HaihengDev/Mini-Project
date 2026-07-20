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
        const data = await getAll('students');
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
    return <h1>Loading...</h1>;
  }

  if (error) {
    setError(error.message);
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

      <table>
        <thead>
          <tr className="btn-wrapper">
            <td colSpan={4} className="export">
              <button onClick={() => setIsOpen(true)}>Add</button>
              <button
                onClick={() => handleExport('students')}
                className="btn-export"
              >
                Export
              </button>
            </td>
          </tr>

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
