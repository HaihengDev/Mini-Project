import { tableHeader } from '../config/config.js';
import './style/course-list.css';

export default function Course(courseId, courseName, startDate) {
  return (
    <section className="course-table">
      <table>
        <thead>
          <tr>
            {tableHeader.map((el, index) => (
              <th key={index}>{el}</th>
            ))}
          </tr>
        </thead>
      </table>
    </section>
  );
}
