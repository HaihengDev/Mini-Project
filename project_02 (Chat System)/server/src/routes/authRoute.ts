import express from 'express';
import { protect } from '../middleware/auth';
import { register, login, getUsers } from '../controller/authController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', protect, getUsers);

export default router;
