import express from 'express';
import { findAllRooms, findRoomById } from '../controllers/roomController.js';

const router = express.Router();

router.get('/', findAllRooms);
router.get('/:id', findRoomById);

export default router;
