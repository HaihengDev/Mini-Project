import { useState, useEffect } from 'react';
import { getAll } from '../endpoints/api.js';
import { handleExport } from '../services/handleExport.js';
import InputForm from './InputForm.jsx';
import TableHeader from './TableHeader.jsx';

export default function MainPage({ path, inputElement, headerRows }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="page-container">
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add Student</h2>

              <button className="modal-close" onClick={() => setIsOpen(false)}>
                ✕
              </button>
            </div>

            <div className="modal-body">
              <InputForm inputElements={inputElement} />
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>

              <button className="btn btn-primary">Insert</button>
            </div>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr className="btn-wrapper">
            <td colSpan={4} className="export">
              <button onClick={() => setIsOpen(true)}>Add</button>
              <button onClick={() => handleExport(path)} className="btn-export">
                Export
              </button>
            </td>
          </tr>

          <TableHeader headerRows={headerRows} />
        </thead>
      </table>
    </section>
  );
}
