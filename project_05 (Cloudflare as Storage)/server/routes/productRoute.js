import express from 'express';
import {
  getAllProducts,
  uploadFile,
} from '../controllers/productController.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();
router.get('/', getAllProducts);
router.post('/upload', upload.single('file'), uploadFile);

export default router;
