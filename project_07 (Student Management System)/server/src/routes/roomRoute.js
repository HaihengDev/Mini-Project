import express from 'express';
import {
  createRoom,
  exportList,
  findAllRooms,
  findRoomById,
} from '../controllers/roomController.js';

const router = express.Router();

router.get('/', findAllRooms);
router.get('/download', exportList);
router.get('/:id', findRoomById);
router.post('/', createRoom);

export default router;
