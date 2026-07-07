import TableHeader from '../components/TableHeader.jsx';
import FormInput from '../components/FormInput.jsx';
import { teacherTableHeader } from '../config/tableConfig.js';
import { teacherForm } from '../config/inputForm.js';

const Page = () => {
  return (
    <section id="container">
      <form>
        {teacherForm.map((form) => (
          <FormInput
            key={form.id}
            id={form.id}
            label={form.label}
            htmlFor={form.htmlFor}
            type={form.type}
            placeholder={form.placeholder}
          />
        ))}
      </form>

      <table>
        <TableHeader tableHeader={teacherTableHeader} />
      </table>
    </section>
  );
};

export default Page;
