import TableHeader from '../components/TableHeader.jsx';
import FormInput from '../components/FormInput.jsx';
import { teacherTableHeader } from '../config/tableConfig.js';
import { teacherForm } from '../config/inputForm.js';

const Page = () => {
  return (
    <section id="container">
      <form>
        {teacherForm.map((field) => (
          <FormInput key={field.id} {...field} />
        ))}
      </form>

      <table>
        <TableHeader tableHeader={teacherTableHeader} />
      </table>
    </section>
  );
};

export default Page;
