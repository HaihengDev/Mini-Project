import express from 'express';
import { protect } from '../middleware/auth';
import { getUserById } from '../controller/messageController';

const router = express.Router();

router.get('/:userId', protect, getUserById);

export default router;
