import express from 'express';
import {
  getAllProducts,
  createProduct,
} from '../controllers/productController.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();
router.get('/', getAllProducts);
router.post('/', upload.single('file'), createProduct);

export default router;
