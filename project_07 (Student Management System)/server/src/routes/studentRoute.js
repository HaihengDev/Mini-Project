import express from 'express';
import upload from '../middleware/upload.js';
import {
  createStudent,
  getAllStudents,
  getStudentById,
  exportList,
} from '../controllers/studentController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();

router.get(
  '/',
  authenticateToken,
  authorizeRoles('admin', 'teacher'),
  getAllStudents,
);
router.get(
  '/download',
  authenticateToken,
  authorizeRoles('admin', 'teacher'),
  exportList,
);
router.get(
  '/:id',
  authenticateToken,
  authorizeRoles('admin', 'teacher'),
  getStudentById,
);
router.post(
  '/',
  // authenticateToken,
  // authorizeRoles('admin'),
  upload.single('photo_url'),
  createStudent,
);

export default router;
