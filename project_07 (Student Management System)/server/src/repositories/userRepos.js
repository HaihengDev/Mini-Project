import pool from '../config/db.js';

class UserRepos {
  async findByEmail(email) {
    const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [
      email,
    ]);

    return rows[0];
  }

  async findById(id) {
    const [rows] = await pool.query(`SELECT * FROM users WHERE user_id = ?`, [
      id,
    ]);
    return rows[0];
  }

  async create(user) {
    const { username, email, password, role } = user;

    const [result] = await pool.query(
      `INSERT INTO users(username, email, password, role) VALUES (?, ?, ?, ?)`,
      [username, email, password, role],
    );

    return result.insertId;
  }

  async updateLastLogin(id) {
    await pool.query(`UPDATE users SET last_login = NOW() WHERE user_id = ?`, [
      id,
    ]);
  }
}

export default new UserRepos();
