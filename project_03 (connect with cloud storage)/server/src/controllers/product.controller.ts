import { Request, Response } from 'express';
import { uploadFileToSupabase } from '../services/upload.service';
import pool from '../config/db';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const [rows]: any[] = await pool.query('SELECT * FROM tbProduct');
    return res.status(200).json(rows);
  } catch (err: any) {
    return res.status(500).json({
      message: 'Server Error',
      Error: err,
    });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, stock } = req.body;
    let imgUrl = null;

    if (req.file) {
      imgUrl = await uploadFileToSupabase(req.file);
    }

    const [result]: any = await pool.query(
      `INSERT INTO tbProduct (product_name, product_image, price, stock) VALUES (?, ?, ?, ?);`,
      [name, imgUrl, price, stock],
    );

    return res.status(201).json({
      message: 'Product is created successfully!',
      productId: result.insertId,
      imgUrl,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({
      message: 'Server Error',
      Error: err,
    });
  }
};
