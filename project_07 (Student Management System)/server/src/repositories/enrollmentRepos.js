import pool from '../config/db.js';

class EnrollmentRepos {
  async findAll() {
    const [rows] = await pool.query('SELECT * FROM enrollments');

    return rows;
  }

  async findById(id) {
    const [row] = await pool.query(
      'SELECT * FROM enrollments WHERE enrollId = ?',
      [id],
    );

    return row;
  }
}

export default new EnrollmentRepos();
