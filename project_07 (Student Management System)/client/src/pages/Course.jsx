import { useState } from 'react';
import { courseTableHeader } from '../config/config.js';
import TableHeader from '../components/TableHeader.jsx';

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="page-container">
      {isOpen && (
        <div className="modal-overaly">
          <div className="modal">
            <div className="modal-header">
              <h2>Add Course</h2>

              <button className="modal-cloase" onClick={() => setIsOpen(false)}>
                x
              </button>
            </div>

            <div className="modal-body"></div>
          </div>
        </div>
      )}

      <div className="table-toolbar">
        <div className="table-actions">
          <button onClick={() => setIsOpen(true)}>Add</button>

          <button>Export</button>
        </div>
      </div>

      <table>
        <thead>
          <TableHeader headerRows={courseTableHeader} />
        </thead>

        <tbody>
          <tr>
            <td colSpan={courseTableHeader.length}>No Courses found.</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default Page;
