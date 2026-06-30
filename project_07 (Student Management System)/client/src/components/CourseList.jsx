import { tableHeader } from '../config/config.js';

export default function Course(courseId, courseName, startDate) {
  return (
    <table id="course-table">
      <thead>
        <tr>
          {tableHeader.map((el, index) => (
            <th key={index}>{el}</th>
          ))}
        </tr>
      </thead>
    </table>
  );
}
