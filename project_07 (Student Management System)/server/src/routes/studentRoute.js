import express from 'express';
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from '../controllers/studentController.js';

const router = express.Router();

router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.get('/', createStudent);
router.get('/:id', updateStudent);
router.get('/:id', deleteStudent);

export default router;
