import FormInput from '../components/FormInput.jsx';
import TableHeader from '../components/TableHeader.jsx';
import { courseForm } from '../config/inputForm.js';
import { courseTableHeader } from '../config/tableConfig.js';

const Page = () => {
  return (
    <section id="container">
      <form>
        {courseForm.map((field) => (
          <FormInput key={`${field.id}`} {...field} />
        ))}
      </form>

      <table>
        <TableHeader tableHeader={courseTableHeader} />
      </table>
    </section>
  );
};

export default Page;
