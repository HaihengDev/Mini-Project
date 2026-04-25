import express from 'express';
import { getAllProducts } from '../controllers/product.controller';
import { upload } from '../middleware/upload';

const router = express.Router();
router.get('/api/products', upload.single('image'), getAllProducts);

export default router;
