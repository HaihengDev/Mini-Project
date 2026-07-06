import TableHeader from '../components/TableHeader.jsx';
import { enrollmentTableHeader } from '../config/tableConfig.js';

export default function Enrollment() {
  return (
    <section id="enrollment-container">
      <table>
        <TableHeader tableHeader={enrollmentTableHeader} />
      </table>
    </section>
  );
}
