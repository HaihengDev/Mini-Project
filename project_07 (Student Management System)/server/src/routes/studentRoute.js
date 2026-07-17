import express from 'express';
import {
  createStudent,
  getAllStudents,
  getStudentById,
  exportList,
} from '../controllers/studentController.js';

const router = express.Router();

router.get('/', getAllStudents);
router.get('/download', exportList);
router.get('/:id', getStudentById);
router.post('/', createStudent);

export default router;
