import ExcelJs from 'exceljs';
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

export const createRoom = async (req, res) => {
  try {
    const roomCreated = await roomService.create(req.body);

    res.status(201).json({
      message: 'Room is created!',
      roomCreated,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server Error!',
    });
  }
};

export const exportList = async (req, res) => {
  try {
    const rooms = await roomService.getAll();

    const workbook = new ExcelJs.Workbook();
    const worksheet = workbook.addWorksheet('Students');

    worksheet.columns = [
      { header: 'RoomId', key: 'roomId', width: 5 },
      { header: 'RoomNumber', key: 'roomNumber', width: 10 },
    ];

    rooms.forEach((room) => {
      const row = worksheet.addRow(room);

      row.font = {
        name: 'Times New Roman',
        size: 12,
      };
    });

    const headerRow = worksheet.getRow(1);
    headerRow.font = {
      name: 'Times New Roman',
      size: 14,
      bold: true,
      color: { argb: 'FFFFFF' },
    };

    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '1E90FF' },
    };

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );

    res.setHeader(
      'Content-Disposition',
      'attachment; filename="room_list.xlsx"',
    );

    await workbook.xlsx.write(res);
    res.status(200).end();
  } catch (err) {
    res.status(500).json({
      message: 'Server Error!',
    });
  }
};
