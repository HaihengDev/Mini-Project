import studentService from '../services/studentService.js';

export const getAllStudents = async (req, res) => {
  try {
    const students = await studentService.getStudents();

    res.status(200).json({
      data: students,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server error!',
    });
  }
};
