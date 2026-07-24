import pool from '../config/db.js';

class CourseRepository {
  async findAll() {
    const [rows] = await pool.query(`
      SELECT
        c.course_id,
        c.course_name,
        c.course_code,
        c.class_id,
        cl.class_name
      FROM courses c
      LEFT JOIN classes cl
        ON c.class_id = cl.class_id
    `);

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
