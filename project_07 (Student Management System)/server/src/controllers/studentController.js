import studentService from '../services/studentService.js';

export const getAllStudents = async (req, res) => {
  try {
    const students = await studentService.getAll();

    res.status(200).json({ studnets });
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
