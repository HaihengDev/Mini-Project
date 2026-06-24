import mongoose from 'mongoose';
import studentService from '../services/studentService.js';

export const getAllStudents = async (req, res) => {
  try {
    const students = await studentService.getStudents();

    res.status(200).json({
      students,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server error!',
    });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        message: 'Invalid id format!',
      });
    }

    const student = await studentService.getStudentById(id);

    res.status(200).json({
      studnet,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server error',
    });
  }
};

export const createStudent = async (req, res) => {
  try {
    const student = req.body;

    const studentCreated = await studentService.createStudent(student);

    res.status(201).json({
      message: 'Student is created successfully!',
      studentCreated,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server error!',
    });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        message: 'Invalid id format!',
      });
    }

    const updatedData = req.body;

    const updatedStudent = await studentService.updateStudent(
      id,
      updateStudent,
    );

    res.status(200).json({
      message: 'Student updated successfully!',
      updatedStudent,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server error!',
    });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        message: 'Invalid id format!',
      });
    }

    const deletedStudent = await studentService.deleteStudent(id);

    res.status(200).json({
      message: 'Student deleted!',
      deletedStudent,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server error!',
    });
  }
};
