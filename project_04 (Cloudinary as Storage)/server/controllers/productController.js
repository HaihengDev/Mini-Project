import pool from '../config/db.js';

export const getAllProducts = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({
      message: 'Server Error',
      Error: err.message,
    });
  }
};
