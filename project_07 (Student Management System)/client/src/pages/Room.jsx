import FormInput from '../components/FormInput.jsx';
import TableHeader from '../components/TableHeader.jsx';
import { roomTableHeader } from '../config/tableConfig.js';
import { roomForm } from '../config/inputForm.js';

const Page = () => {
  return (
    <section id="room-container">
      <form>
        {roomForm.map((room) => (
          <FormInput
            key={room.id}
            id={room.id}
            label={room.label}
            htmlFor={room.htmlFor}
            type={room.type}
            placeholder={room.placeholder}
          />
        ))}
      </form>

      <table>
        <TableHeader tableHeader={roomTableHeader} />
      </table>
    </section>
  );
};

export default Page;
