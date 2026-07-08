import mongoose from 'mongoose';
import enrollmentService from '../services/enrollmentService.js';

export const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await enrollmentService.getAll();

    res.status(200).json({ enrollments });
  } catch (err) {
    res.status(500).json({
      message: 'Server error!',
      result: err.message,
    });
  }
};

export const getEnrollmentById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        message: 'Invalid id format!',
      });
    }

    const enrollment = await enrollmentService.getById(id);

    if (!enrollment) {
      res.status(404).json({
        message: 'Enrollment not found!',
      });
    }

    res.status(200).json({
      enrollment,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server error!',
      result: err.message,
    });
  }
};

export const createEnrollment = async (req, res) => {
  try {
    const enrollment = req.body;

    if (!enrollment) {
      res.status(400).json({
        message: 'Invalid data input!',
      });
    }

    const enrollmentCreated = await enrollmentService.create(enrollment);

    res.status(201).json({
      message: 'Enrollment is created successfully!',
      enrollmentCreated,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server error!',
      result: err.message,
    });
  }
};

export const updateEnrollment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        messag: 'Invalid id format!',
      });
    }

    const upateData = req.body;

    if (!updateData) {
      res.staus(400).json({
        message: 'Invalid data update input!',
      });
    }

    const updatedEnrollment = await enrollmentService.update(id, updateData);

    res.status(200).json({
      message: 'Enroll updated successfully!',
      updatedEnrollment,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server error!',
      result: err.message,
    });
  }
};

export const deleteEnrollment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        message: 'Invalid id format!',
      });
    }

    const deletedEnrollment = await enrollmentService.delete(id);

    res.status(200).json({
      message: 'Enroll deleted successfully!',
      deleteEnrollment,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server error!',
      result: err.message,
    });
  }
};
