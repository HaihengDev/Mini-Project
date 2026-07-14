import express from 'express';
import {
  createStudent,
  getAllStudents,
  getStudentById,
} from '../controllers/studentController.js';

const router = express.Router();

router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.post('/', createStudent);

export default router;
