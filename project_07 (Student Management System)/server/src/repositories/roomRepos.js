import pool from '../config/db.js';

class RoomRepository {
  async findAll() {
    const [rows] = await pool.query('SELECT * FROM rooms');
    return rows;
  }

  async findById(id) {
    const [row] = await pool.query(`SELECT * FROM rooms WHERE roomId = ?`, [
      id,
    ]);
    return row;
  }

  async create(room) {
    const { roomId, roomNumber } = room;

    const [result] = await pool.query(
      `INSERT INTO rooms (roomId, roomNumber) VALUES (?, ?)`,
      [roomId, roomNumber],
    );

    return result;
  }
}

export default new RoomRepository();
