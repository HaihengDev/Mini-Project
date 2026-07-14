import express from 'express';
import {
  getAllStudentDetails,
  getStudentDetailById,
} from '../controllers/studentDetailController.js';

const router = express.Router();

router.get('/', getAllStudentDetails);
router.get('/:id', getStudentDetailById);

export default router;
