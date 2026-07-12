import courseService from '../services/courseService.js';

export const getAllCourses = async (req, res) => {
  try {
    const courses = await courseService.getAll();

    res.status(200).json({ courses });
  } catch (err) {
    res.status(500).json({
      message: 'Server Error!',
    });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const id = req.params.id;

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: 'Invalid id format!',
      });
    }

    const course = await courseService.getById(id);

    if (!course) {
      return res.status(404).json({
        message: 'Course Not Found!',
      });
    }

    res.status(200).json({
      course,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server Error!',
    });
  }
};
