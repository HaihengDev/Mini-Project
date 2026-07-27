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

  async create(student) {
    const { user_id, first_name, last_name, dob, gender, class_id, photo_url } = student;

    const [studentCreated] = await pool.query(
      `INSERT INTO students (user_id, first_name, last_name, dob, gender, class_id, photo_url)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [user_id, first_name, last_name, dob, gender, class_id, photo_url],
    );

    return studentCreated.insertId;
  }
}

export default new StudentRepos();
