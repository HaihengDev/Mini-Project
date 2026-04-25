import express from 'express';
import {
  createProduct,
  getAllProducts,
} from '../controllers/product.controller';
import { upload } from '../middleware/upload';

const router = express.Router();
router.get('/api/products', upload.single('image'), getAllProducts);
router.post('/api/products', upload.single('image'), createProduct);

export default router;
