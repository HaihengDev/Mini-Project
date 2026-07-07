import FormInput from '../components/FormInput.jsx';
import TableHeader from '../components/TableHeader.jsx';
import { courseForm } from '../config/inputForm.js';
import { courseTableHeader } from '../config/tableConfig.js';

const Page = () => {
  return (
    <section id="container">
      <form>
        {courseForm.map((form) => (
          <FormInput
            key={`${form.id}`}
            id={form.id}
            label={form.label}
            htmlFor={form.htmlFor}
            type={form.type}
            placeholder={form.placeholder}
          />
        ))}
      </form>

      <table>
        <TableHeader tableHeader={courseTableHeader} />
      </table>
    </section>
  );
};

export default Page;
