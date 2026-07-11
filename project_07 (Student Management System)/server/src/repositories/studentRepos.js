import pool from '../config/db.js';

class StudentRepos {
  async findAll() {
    const [rows] = await pool.query('SELECT * FROM students');
    return rows;
  }

  async findById(id) {
    const [row] = await pool.query(
      'SELECT * FROM students WHERE studentId = ?',
      [id],
    );

    return row;
  }
}

export default new StudentRepos();
