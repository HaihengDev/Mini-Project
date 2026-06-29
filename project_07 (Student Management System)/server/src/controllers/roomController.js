import mongoose from 'mongoose';
import roomService from '../services/roomService.js';

export const getAllRooms = async (req, res) => {
  try {
    const rooms = await roomService.getAllRooms();

    res.status(200).json({
      rooms,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server error!',
    });
  }
};

export const getRoomById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        message: 'Invalid id format!',
      });
    }

    const room = await roomService.getRoomById(id);

    if (!room) {
      res.status(404).json({
        message: 'Room is not found!',
      });
    }

    res.status(200).json({
      room,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server error!',
    });
  }
};

export const createRoom = async (req, res) => {
  try {
    const { room } = req.body;

    if (!room) {
      res.status(400).json({
        message: 'Room input is invalid!',
      });
    }

    const roomCreated = roomService.createRoom(room);

    res.status(201).json({
      message: 'Romm is created!',
      roomCreated,
    });
  } catch (err) {
    res.staus(500).json({
      message: 'Server error!',
    });
  }
};

export const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        message: 'Invalid id format!',
      });
    }

    const updateData = req.body;

    const updatedRoom = await roomService.updateRoom(id, updateData);

    res.status(200).json({
      message: 'Room updated!',
      updatedRoom,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server error!',
    });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        message: 'Invalid id format!',
      });
    }

    const deletedRoom = await roomService.deleteRoom(id);

    res.status(200).json({
      message: 'Deleted room!',
      deleteRoom,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error!' });
  }
};
