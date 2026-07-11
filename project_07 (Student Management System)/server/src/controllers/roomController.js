import roomService from '../services/roomService.js';

export const findAllRooms = async (req, res) => {
  try {
    const rooms = await roomService.getAll();

    res.status(200).json({
      rooms,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server Error!',
    });
  }
};

export const findRoomById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: 'Invalid id format!',
      });
    }

    const room = await roomService.getById(id);

    res.status(200).json({ room });
  } catch (err) {
    res.status(500).json({
      message: 'Server Error!',
    });
  }
};
