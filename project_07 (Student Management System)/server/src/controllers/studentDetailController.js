import studentDetailService from '../services/studentDetailService.js';

export const getAllStudentDetails = async (req, res) => {
  try {
    const studentDetails = await studentDetailService.getAll();

    res.status(200).json({
      studentDetails,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server Error!',
      result: err.message,
    });
  }
};

export const getStudentDetailById = async (req, res) => {
  try {
    const id = req.params.id;

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: 'Invalid id format!',
      });
    }

    const studentDetail = await studentDetailService.findById(id);

    if (!studentDetail) {
      return res.status(404).json({
        message: 'Student Detail not found!',
      });
    }

    res.status(200).json({ studentDetail });
  } catch (err) {
    res.status(500).json({
      message: 'Server Error!',
      result: err.message,
    });
  }
};
