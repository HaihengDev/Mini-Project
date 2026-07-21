import pool from '../config/db.js';

class RoomRepository {
  async findAll() {
    const [rows] = await pool.query('SELECT * FROM classes');
    return rows;
  }

  async findById(id) {
    const [row] = await pool.query(`SELECT * FROM classes WHERE class_id = ?`, [
      id,
    ]);
    return row;
  }

  async create(room) {
    const { class_name, academic_year } = room;

    const [result] = await pool.query(
      `INSERT INTO classes (class_name, academic_year) VALUES (?, ?)`,
      [class_name, academic_year],
    );

    return result;
  }
}

export default new RoomRepository();
