import express from 'express';
import {
  createProduct,
  getAllProducts,
} from '../controllers/product.controller';
import { upload } from '../middleware/upload';

const router = express.Router();
router.get('/api/products', getAllProducts);
router.post('/api/products', upload.single('image'), createProduct);

export default router;
