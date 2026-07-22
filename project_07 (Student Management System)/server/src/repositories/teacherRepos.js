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

  async create(teacher) {
    const {
      user_id,
      employee_no,
      first_name,
      last_name,
      gender,
      phone,
      joining_date,
    } = teacher;

    const [row] = await pool.query(
      `INSERT INTO teachers (
        user_id, 
        employee_no, 
        first_name, 
        last_name, 
        gender,
        phone, 
        joining_date) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        teacher_id,
        user_id,
        employee_no,
        first_name,
        last_name,
        gender,
        phone,
        joining_date,
      ],
    );

    return {
      teacher_id: row.insertId,
      ...teacher,
    };
  }
}

export default new TeacherRepository();
