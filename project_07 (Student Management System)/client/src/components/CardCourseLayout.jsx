import { useState, useEffect } from 'react';
import { getAll } from '../endpoints/api.js';
import CardCourse from './CardCourse.jsx';

export default function CardCourseLayout() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCourse() {
      try {
        const data = await getAll('courses');
        setCourses(data.courses);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadCourse();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <section id="card-course-layout">
      {courses.map((course) => (
        <CardCourse key={course.id} name={course.name} room={course.roomId} />
      ))}
    </section>
  );
}
