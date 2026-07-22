import express from 'express';
import {
  createTeacher,
  exportList,
  getAllTeachers,
  getTeacherById,
} from '../controllers/teacherController.js';

const router = express.Router();

router.get('/', getAllTeachers);
router.get('/download', exportList);
router.get('/:id', getTeacherById);
router.post('/', createTeacher);

export default router;
