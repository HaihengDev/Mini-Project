import express from 'express';
import {
  getAllEnrollments,
  getEnrollmentById,
} from '../controllers/enrollmentController.js';

const router = express.Router();

router.get('/', getAllEnrollments);
router.get('/:id', getEnrollmentById);

export default router;
