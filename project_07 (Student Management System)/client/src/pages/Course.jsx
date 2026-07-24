import { useState, useEffect, useCallback } from 'react';
import { courseTableHeader } from '../config/config.js';
import { courseInput } from '../config/input.js';
import { getAll, create } from '../endpoints/api.js';
import TableHeader from '../components/TableHeader.jsx';
import InputForm from '../components/InputForm.jsx';

const Page = () => {
  const [rooms, setRooms] = useState([]);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchCourses = useCallback(async () => {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error('Failed to fetch (request timeout)!')),
        10000,
      ),
    );

    const data = await Promise.race([getAll('courses'), timeoutPromise]);

    setCourses(data.courses ?? []);
  });

  useEffect(() => {
    async function loadCourses() {
      try {
        await fetchCourses();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadCourses();
  }, [fetchCourses]);

  useEffect(() => {
    async function fetchAllRooms() {
      try {
        const data = await getAll('rooms');
        setRooms(data.rooms);
      } catch (err) {
        throw new Error('Failed to fetch rooms');
      }
    }

    fetchAllRooms();
  }, []);

  const roomOptions = rooms.map((room) => ({
    value: room.class_id,
    label: room.class_name,
  }));

  const courseFormInput = courseInput.map((input) => {
    if (input.id === 'class_id') {
      return {
        ...input,
        options: roomOptions,
      };
    }

    return input;
  });

  const handleCreateCourse = async (event) => {
    event.preventDefault();
    setSubmitError('');
    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);

      const course_name = formData.get('course_name');
      const course_code = formData.get('course_code');
      const class_id = formData.get('class_id');

      await create('courses', {
        course_name,
        course_code,
        class_id,
      });

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
        <h2>Loading courses...</h2>
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
              <h2>Add Course</h2>

              <button className="modal-close" onClick={() => setIsOpen(false)}>
                x
              </button>
            </div>

            <div className="modal-body">
              <InputForm
                formId="create-course-form"
                inputElements={courseFormInput}
                onSubmit={handleCreateCourse}
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
                form="create-course-form"
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

          <button>Export</button>
        </div>
      </div>

      <table>
        <thead>
          <TableHeader headerRows={courseTableHeader} />
        </thead>

        <tbody>
          {courses.length === 0 ? (
            <td>
              <tr colSpan={courseTableHeader.length}>No Course Found.</tr>
            </td>
          ) : (
            courses.map((course) => (
              <tr key={course.id}>
                <td>{course.course_id}</td>
                <td>{course.course_name}</td>
                <td>{course.course_code}</td>
                <td>{course.class_name}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
};

export default Page;
