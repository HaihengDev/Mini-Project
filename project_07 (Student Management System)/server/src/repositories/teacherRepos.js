import pool from '../config/db.js';

class TeacherRepository {
  async findAll() {
    const [rows] = await pool.query('SELECT * FROM teachers');

    return rows;
  }

  async findById(id) {
    const [row] = await pool.query(
      'SELECT * FROM teachers WHERE teacherId = ?',
      [id],
    );

    return row;
  }
}

export default new TeacherRepository();
