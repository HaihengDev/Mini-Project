import pool from '../config/db.js';

class UserRepos {
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

    return {
      user_id: result.insertId,
      ...user
    };
  }

  async updateLastLogin(id) {
    await pool.query(`UPDATE users SET last_login = NOW() WHERE user_id = ?`, [
      id,
    ]);
  }

  async findByEmail(email) {
    const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [
      email,
    ]);

    return rows[0];
  }

  async saveResetOtp(userId, otp, expires) {
    await pool.query(`
      UPDATE users
      SET reset_password_token = ?, reset_password_expires = ?
      WHERE user_id = ?
    `,
      [otp, expires, userId]
    );
  }

  async verifyResetOtp(email, otp){
    const [rows] = await pool.query(`
      SELECT user_id, reset_password_token, reset_password_expires
      FROM users
      WHERE email = ?
    `, [email]);

    const user = rows[0];

    if(!user) {
      return null;
    }

    if(user.reset_password_token !== otp) {
      return null;
    }

    if(
      !user.reset_password_expires ||
      new Date() > new Date(user.reset_password_expires)
    ) {
      return null;
    }

    return user;
  }

  async updatePassword(userId, hashedPassword) {
    await pool.query(
      `UPDATE users
      SET password = ?,
          reset_password_token = NULL,
          reset_password_expires = NULL
          WHERE user_id = ?`,
      [hashedPassword, userId]
    );
  }
}

export default new UserRepos();
