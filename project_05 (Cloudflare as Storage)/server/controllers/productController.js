import pool from '../config/db.js';
import { uploadFile } from '../services/uploadToCloud.js';

export const getAllProducts = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({
      message: 'Server error!',
      result: err.message,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).json({ message: 'Image product is required!' });
    }

    const image = await uploadFile(file);

    const { id, name, price, discount } = req.body;

    const [result] = await pool.query(
      `INSERT INTO products (id, name, imgUrl, price, discount) VALUES (?, ?, ?, ?, ?)`,
      [id, name, image, price, discount],
    );

    res.status(201).json({
      message: 'Product is created sucessfully!',
      result,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server error!',
      result: err.message,
    });
  }
};
