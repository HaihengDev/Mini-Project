import { useEffect, useState } from 'react';
import { studentTableHeader } from '../config/config.js';
import { getAllStudents } from '../endpoints/api.js';
import './style/table.css';

export default function Table() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const data = await getAllStudents();
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
    return <h1>{error}</h1>;
  }

  return (
    <table>
      <thead>
        <tr>
          <td colSpan={4} className="export">
            <button>Export</button>
          </td>
        </tr>
        <tr>
          {studentTableHeader.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {students.length === 0 ? (
          <tr>
            <td colSpan={studentTableHeader.length}>No students found.</td>
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
  );
}
