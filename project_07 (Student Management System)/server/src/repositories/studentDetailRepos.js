import pool from '../config/db.js';

class StudentDetailRepos {
  async findAll() {
    return await pool.query('SELECT * FROM studentDetails');
  }

  async findById(id) {
    return await pool.query(
      'SELECT * FROM studentDetails WHERE studentDetailId = ?',
      [id],
    );
  }
}

export default new StudentDetailRepos();
