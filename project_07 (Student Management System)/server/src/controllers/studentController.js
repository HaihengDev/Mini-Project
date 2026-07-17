import ExcelJs from 'exceljs';
import studentService from '../services/studentService.js';

export const getAllStudents = async (req, res) => {
  try {
    const students = await studentService.getAll();

    res.status(200).json({ students });
  } catch (err) {
    res.status(500).json({
      message: 'Server Error!',
    });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const id = req.params.id;

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: 'Invalid id format!',
      });
    }

    const student = await studentService.getById(id);

    if (!student) {
      return res.status(404).json({
        message: 'Student Not Found!',
      });
    }

    res.status(200).json({ student });
  } catch (err) {
    res.status(500).json({
      message: 'Server Error!',
    });
  }
};

export const createStudent = async (req, res) => {
  try {
    const studentCreated = await studentService.create(req.body);

    res.status(201).json({
      message: 'Student is created successfully!',
      studentCreated,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server Error!',
    });
  }
};

export const exportList = async (req, res) => {
  try {
    const students = await studentService.getAll();

    const workbook = new ExcelJs.Workbook();
    const worksheet = workbook.addWorksheet('Students');

    worksheet.columns = [
      { header: 'StudentId', key: 'studentId', width: 10 },
      { header: 'StudentFirstName', key: 'studentFirstName', width: 25 },
      { header: 'StudentLastName', key: 'studentLastName', width: 35 },
      { header: 'Gender', key: 'gender', width: 15 },
    ];

    students.forEach((student) => {
      const row = worksheet.addRow(student);

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
      'attachment; filename="student_list.xlsx"',
    );

    await workbook.xlsx.write(res);
    res.status(200).end();
  } catch (err) {
    res.status(500).json({
      message: 'Server Error!',
    });
  }
};
