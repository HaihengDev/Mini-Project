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

  async create(course) {
    const { course_name, course_code, class_id } = course;

    const [row] = await pool.query(
      `INSERT INTO courses (
      course_name,
      course_code,
      class_id
    ) VALUES (?, ?, ?)`,
      [course_name, course_code, class_id],
    );

    return { course_id: row.insertId, ...course };
  }
}

export default new CourseRepository();
