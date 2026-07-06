import TableHeader from '../components/TableHeader.jsx';
import { teacherTableHeader } from '../config/tableConfig.js';

const Page = () => {
  return (
    <section id="teacher-container">
      <table>
        <TableHeader tableHeader={teacherTableHeader} />
      </table>
    </section>
  );
};

export default Page;
