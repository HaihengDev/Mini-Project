import pool from '../config/db.js';
import { uploadToCloudinary } from '../services/uploadToCloudinary.js';

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

export const createProduct = async (req, res) => {
  try {
    const { product_id, product_name, price, discount } = req.body;
    let image = null;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      image = result.secure_url;
    }

    const [result] = await pool.query(
      `INSERT INTO products(id, name, imgUrl, price, discount) VALUES (?, ?, ?, ?, ?)`,
      [product_id, product_name, image, price, discount],
    );

    res.status(201).json({
      message: 'Product is created successfully!',
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error!',
      result: error.message,
    });
  }
};
