import TeacherService from '../services/teacherService.js';

export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await TeacherService.getAll();

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

    const teacher = await TeacherService.getById(id);

    if (!teacher) {
      res.status(404).json({
        message: 'Teacher Not Found!',
      });
    }

    res.status(200).json({ teacher });
  } catch (err) {}
};
