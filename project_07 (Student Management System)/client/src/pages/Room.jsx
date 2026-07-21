import { useCallback, useEffect, useMemo, useState } from 'react';
import { create, getAll } from '../endpoints/api.js';
import { classTableHeader } from '../config/config.js';
import { classInput } from '../config/input.js';
import { handleExport } from '../services/handleExport.js';
import InputForm from '../components/InputForm.jsx';
import TableHeader from '../components/TableHeader.jsx';

const Page = () => {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedAcademicYear, setSelectedAcademicYear] = useState('all');

  const fetchRooms = useCallback(async () => {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error('Failed to fetch (request timeout)!')),
        10000,
      ),
    );

    const data = await Promise.race([getAll('rooms'), timeoutPromise]);

    setRooms(data.rooms ?? []);
  }, []);

  useEffect(() => {
    async function loadRooms() {
      try {
        await fetchRooms();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadRooms();
  }, [fetchRooms]);

  const academicYears = useMemo(() => {
    return [...new Set(rooms.map((room) => room.academic_year))].sort();
  }, [rooms]);

  const filteredRooms = useMemo(() => {
    if (selectedAcademicYear === 'all') {
      return rooms;
    }

    return rooms.filter((room) => room.academic_year === selectedAcademicYear);
  }, [rooms, selectedAcademicYear]);

  const handleCreateRoom = async (event) => {
    event.preventDefault();
    setSubmitError('');
    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);

      const academicYearStart = formData.get('academic_year_start');
      const academicYearEnd = formData.get('academic_year_end');

      await create('rooms', {
        class_name: formData.get('class_name'),
        academic_year: `${academicYearStart}-${academicYearEnd}`,
      });

      await fetchRooms();

      setIsOpen(false);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <h2>Loading rooms...</h2>
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
              <h2>Add Class</h2>

              <button className="modal-close" onClick={() => setIsOpen(false)}>
                ✕
              </button>
            </div>

            <div className="modal-body">
              <InputForm
                formId="create-room-form"
                inputElements={classInput}
                onSubmit={handleCreateRoom}
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
                form="create-room-form"
                type="submit"
              >
                {isSubmitting ? 'Inserting...' : 'Insert'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="table-toolbar">
        <div className="academic-year-filter">
          <label htmlFor="academic-year">Academic Year:</label>

          <select
            id="academic-year"
            value={selectedAcademicYear}
            onChange={(event) => setSelectedAcademicYear(event.target.value)}
          >
            <option value="all">All Academic Years</option>

            {academicYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="table-actions">
          <button onClick={() => setIsOpen(true)}>Add</button>

          <button onClick={() => handleExport('rooms')} className="btn-export">
            Export
          </button>
        </div>
      </div>

      <table>
        <thead>
          <TableHeader headerRows={classTableHeader} />
        </thead>

        <tbody>
          {filteredRooms.length === 0 ? (
            <tr>
              <td colSpan={classTableHeader.length}>
                No classes found for this academic year.
              </td>
            </tr>
          ) : (
            filteredRooms.map((room) => (
              <tr key={room.class_id}>
                <td>{room.class_id}</td>
                <td>{room.class_name}</td>
                <td>{room.academic_year}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
};

export default Page;
