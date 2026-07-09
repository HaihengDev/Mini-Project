import TableHeader from '../components/TableHeader.jsx';
import { enrollmentTableHeader } from '../config/tableConfig.js';

export default function Enrollment() {
  return (
    <section id="container">
      <div className="table-container">
        <table>
          <TableHeader tableHeader={enrollmentTableHeader} />
        </table>
      </div>
    </section>
  );
}
