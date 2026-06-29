import mongoose from 'mongoose';
import TeacherService from '../services/teacherService.js';

export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await TeacherService.getAll();

    res.status(200).json({ teachers });
  } catch (err) {
    res.status(500).json({
      message: 'Server error!',
    });
  }
};

export const getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        message: 'Invalid id format!',
      });
    }

    const teacher = await TeacherService.getById(id);

    if (!teacher) {
      res.status(404).json({
        message: 'Teacher is not found!',
      });
    }

    res.status(200).json({ teacher });
  } catch (err) {
    res.status(500).json({
      message: 'Server error!',
    });
  }
};

export const createTeacher = async (req, res) => {
  try {
    const teacher = req.body;

    if (!teacher) {
      res.status(400).json({
        message: 'Invalid teacher input!',
      });
    }

    const teacherCreated = await TeacherService.create(teacher);

    res.status(201).json({
      message: 'Teacher created successfully!',
      teacherCreated,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server error!',
    });
  }
};

export const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        message: 'Invalid id format!',
      });
    }

    const updatedData = req.body;

    if (!updatedData) {
      res.status(400).json({
        message: 'Invalid input data update!',
      });
    }

    const teacherUpdated = await TeacherService.update(id, updatedData);

    res.status(200).json({
      message: 'Teacher updated successfully!',
      teacherUpdated,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server error!',
    });
  }
};

export const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        message: 'Invalid id format!',
      });
    }

    const teacherDeleted = await TeacherService.delete(id);

    res.status(200).json({
      message: 'Teacher deleted successfully!',
      teacherDeleted,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server error!',
    });
  }
};
