import pool from '../config/db.js';

class CourseRepository {
  async findAll() {
    const [rows] = await pool.query('SELECT * FROM courses');

    return rows;
  }

  async findById(id) {
    const [row] = await pool.query('SELECT * FROM courses WHERE courseId = ?', [
      id,
    ]);

    return row;
  }
}

export default new CourseRepository();
