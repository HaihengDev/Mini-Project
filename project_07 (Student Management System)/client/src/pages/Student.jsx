import { useState, useEffect } from 'react';
import { getAll } from '../endpoints/api.js';
import { studentTableHeader } from '../config/config.js';
import { handleExport } from '../services/handleExport.js';
import TableHeader from '../components/TableHeader.jsx';

const Page = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);

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
    <table>
      <thead>
        <tr>
          <td colSpan={4} className="export">
            <button onClick={() => handleExport('students')}>Export</button>
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
  );
};

export default Page;
