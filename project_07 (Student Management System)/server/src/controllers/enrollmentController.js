import enrollmentService from '../services/enrollmentService.js';

export const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await enrollmentService.getAll();

    res.status(200).json({ enrollments });
  } catch (err) {
    res.status(500).json({
      message: 'Server Error!',
    });
  }
};

export const getEnrollmentById = async (req, res) => {
  try {
    const id = req.params.id;

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: 'Invalid id format!',
      });
    }

    const enrollment = await enrollmentService.getById(id);

    if (!enrollment) {
      return res.status(404).json({
        message: 'Enrollment Not Found!',
      });
    }

    res.status(200).json({
      enrollment,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server Error!',
    });
  }
};
