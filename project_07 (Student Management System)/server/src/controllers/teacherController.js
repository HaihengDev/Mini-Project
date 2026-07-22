import ExcelJs from 'exceljs';
import teacherService from '../services/teacherService.js';

export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await teacherService.getAll();

    res.status(200).json({
      teachers,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server Error!',
    });
  }
};

export const getTeacherById = async (req, res) => {
  try {
    const id = req.params.id;

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: 'Invalid id format!',
      });
    }

    const teacher = await teacherService.getById(id);

    if (!teacher) {
      res.status(404).json({
        message: 'Teacher Not Found!',
      });
    }

    res.status(200).json({ teacher });
  } catch (err) {
    res.status(500).json({
      message: 'Server Error!',
    });
  }
};

export const exportList = async (req, res) => {
  try {
    const teachers = await teacherService.getAll();

    const workbook = new ExcelJs.Workbook();
    const worksheet = workbook.addWorksheet('Rooms');

    worksheet.columns = [
      { header: 'Teacher Id', Key: 'employee_no', widht: 10 },
      { header: 'First Name', key: 'first_name', width: 25 },
      { header: 'Last Name', key: 'last_name', width: 30 },
      { header: 'Gender', key: 'gender', width: 15 },
      { header: 'Phone', key: 'phone', width: 20 },
      { header: 'Joining Date', key: 'joining_date', width: 25 },
    ];

    teachers.forEach((teacher) => {
      const row = worksheet.addRow(teacher);

      row.font = {
        name: 'Times New Roman',
        size: 12,
      };
    });

    const headerRow = worksheet.getRow(1);
    headerRow.font = {
      name: 'Time New Roman',
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
      'attachment; filename="student_list.xlsx"',
    );

    await workbook.xlsx.write(res);
    res.status(200).end();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

export const createTeacher = async (req, res) => {
  try {
    const teacher = await teacherService.create(req.body);

    return res.status(201).json({
      success: true,
      message: 'Teacher created successfully!',
      teacher,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to create teacher',
    });
  }
};
