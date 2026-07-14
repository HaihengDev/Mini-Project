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
    const { id, firstName, lastName, gender } = student;

    const [studentCreated] = await pool.query(
      `INSERT INTO students (studentId, studentFirstName, studentLastName, gender) VALUE (?, ?, ?, ?)`,
      [id, firstName, lastName, gender],
    );

    return studentCreated;
  }
}

export default new StudentRepos();
