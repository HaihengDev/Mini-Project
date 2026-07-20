import { useState, useEffect } from 'react';
import { getAll } from '../endpoints/api.js';
import { roomTableHeader } from '../config/config.js';
import { roomInput } from '../config/input.js';
import { handleExport } from '../services/handleExport.js';
import InputForm from '../components/InputForm.jsx';
import TableHeader from '../components/TableHeader.jsx';

const Page = () => {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchRooms() {
      try {
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error('Failed to fetch (request timeout)!')),
            10000,
          ),
        );

        const data = await Promise.race([getAll('rooms'), timeoutPromise]);

        setRooms(data.rooms ?? []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRooms();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <h2>Loading rooms...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-card">
          <div className="error-icon">⚠️</div>
          <h2>Oops!</h2>
          <p>{error}</p>

          <button
            className="btn-retry"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <section id="page-container">
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add Room</h2>

              <button className="modal-close" onClick={() => setIsOpen(false)}>
                ✕
              </button>
            </div>

            <div className="modal-body">
              <InputForm inputElements={roomInput} />
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
              <button
                onClick={() => handleExport('rooms')}
                className="btn-export"
              >
                Export
              </button>
            </td>
          </tr>
          <TableHeader headerRows={roomTableHeader} />
        </thead>

        <tbody>
          {rooms.length === 0 ? (
            <tr>
              <td>Room is empty!</td>
            </tr>
          ) : (
            rooms.map((room) => (
              <tr key={room.roomId}>
                <td>{room.roomId}</td>
                <td>{room.roomNumber}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
};

export default Page;
