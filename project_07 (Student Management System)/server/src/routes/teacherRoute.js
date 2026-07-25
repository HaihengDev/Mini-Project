import express from 'express';
import {
  createTeacher,
  exportList,
  getAllTeachers,
  getTeacherById,
} from '../controllers/teacherController.js';
import {authenticateToken} from "../middleware/authenticateToken.js";
import {authorizeRoles} from "../middleware/authorizeRoles.js";

const router = express.Router();

router.get(
  '/',
  authenticateToken,
  authorizeRoles('admin'),
  getAllTeachers
);
router.get(
  '/download',
  authenticateToken,
  authorizeRoles('admin', 'teacher'),
  exportList
);
router.get(
  '/:id',
  authenticateToken,
  authorizeRoles('admin'),
  getTeacherById
);
router.post(
  '/',
  authenticateToken,
  authorizeRoles('admin'),
  createTeacher
);

export default router;
