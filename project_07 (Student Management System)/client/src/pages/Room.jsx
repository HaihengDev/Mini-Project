import FormInput from '../components/FormInput.jsx';
import TableHeader from '../components/TableHeader.jsx';
import { roomTableHeader } from '../config/tableConfig.js';
import { roomForm } from '../config/inputForm.js';

const Page = () => {
  return (
    <section id="container">
      <form>
        {roomForm.map((field) => (
          <FormInput key={field.id} {...field} />
        ))}
      </form>

      <table>
        <TableHeader tableHeader={roomTableHeader} />
      </table>
    </section>
  );
};

export default Page;
