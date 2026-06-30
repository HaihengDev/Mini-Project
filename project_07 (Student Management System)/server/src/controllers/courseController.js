import mongoose from 'mongoose';
import courseService from '../services/courseService.js';

export const getAllCourses = async (req, res) => {
  try {
    const courses = await courseService.getAll();

    res.status(200).json({
      courses,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server error!',
    });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        message: 'Invalid id format!',
      });
    }

    const course = await courseService.getById(id);

    if (!course) {
      res.status(404).json({
        message: 'Course is not found!',
      });
    }

    res.status(200).json({ course });
  } catch (err) {
    res.status(500).json({
      message: 'Server error!',
    });
  }
};

export const createCourse = async (req, res) => {
  try {
    const course = req.body;

    if (!course) {
      res.status(400).json({
        message: 'Invalid input!',
      });
    }

    const courseCreated = await courseService.create(course);

    res.status(201).json({
      message: 'Course created successfully!',
      courseCreated,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server error!',
    });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        message: 'Invalid id format!',
      });
    }

    const updateData = req.body;

    if (!updateData) {
      res.status(400).json({
        message: 'Invalid input',
      });
    }

    const courseUpdated = await courseService.update(id, updateData);

    res.status(200).json({
      message: 'Course updated successfully!',
      courseUpdated,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server error!',
    });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        message: 'Invalid id format!',
      });
    }

    const courseDeleted = await courseService.delete(id);

    res.status(200).json({
      message: 'Course deleted successfully!',
      courseDeleted,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server error!',
    });
  }
};
