import TableHeader from '../components/TableHeader.jsx';
import FormInput from '../components/FormInput.jsx';
import { studentTableHeader } from '../config/tableConfig.js';
import { studentForm } from '../config/inputForm.js';

const Page = () => {
  return (
    <section id="container">
      <form>
        {studentForm.map((form) => (
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
        <TableHeader tableHeader={studentTableHeader} />
      </table>
    </section>
  );
};

export default Page;
