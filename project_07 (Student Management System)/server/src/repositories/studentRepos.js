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
    const {
      student_id,
      user_id,
      first_name,
      last_name,
      dob,
      gender,
      class_id
    } = student;

    const [studentCreated] = await pool.query(
      `INSERT INTO students (student_id, user_id, first_name, last_name, dob, gender, class_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        student_id,
        user_id,
        first_name,
        last_name,
        dob,
        gender,
        class_id
      ]
    );

    return studentCreated;
  }
}

export default new StudentRepos();
