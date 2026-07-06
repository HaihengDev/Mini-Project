import TableHeader from '../components/TableHeader.jsx';
import { studentTableHeader } from '../config/tableConfig.js';

const Page = () => {
  return (
    <section id="student-container">
      <table>
        <TableHeader tableHeader={studentTableHeader} />
      </table>
    </section>
  );
};

export default Page;
