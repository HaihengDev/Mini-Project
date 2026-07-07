import TableHeader from '../components/TableHeader.jsx';
import FormInput from '../components/FormInput.jsx';
import { studentTableHeader } from '../config/tableConfig.js';
import { studentForm } from '../config/inputForm.js';

const Page = () => {
  return (
    <section id="container">
      <form>
        {studentForm.map((field) => (
          <FormInput key={field.id} {...field} />
        ))}
      </form>

      <table>
        <TableHeader tableHeader={studentTableHeader} />
      </table>
    </section>
  );
};

export default Page;
