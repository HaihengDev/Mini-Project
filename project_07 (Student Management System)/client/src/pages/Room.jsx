import { useState, useEffect } from 'react';
import { getAll } from '../endpoints/api.js';
import { roomTableHeader } from '../config/config.js';
import TableHeader from '../components/TableHeader.jsx';

const Page = () => {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRooms() {
      try {
        const data = await getAll('rooms');
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
    return <h1>loading...</h1>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <table>
      <thead>
        <tr>
          <td colSpan={4} className="export">
            <button>Export</button>
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
  );
};

export default Page;
