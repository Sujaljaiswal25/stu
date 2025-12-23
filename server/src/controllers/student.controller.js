import { validationResult } from "express-validator";
import Student from "../models/Student.js";
import User from "../models/User.js";

// @desc    Get all students (admin) or own profile (student)
// @route   GET /api/students
// @access  Private
const getStudents = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = Math.min(parseInt(limit), 50); // Max 50 items per page

    if (req.user.role === "admin") {
      // Admin: Get all students with pagination
      const total = await Student.countDocuments();
      const students = await Student.find()
        .populate("userId", "email role")
        .limit(limitNum)
        .skip((pageNum - 1) * limitNum)
        .sort({ enrollmentDate: -1 });

      res.json({
        success: true,
        students,
        pagination: {
          total,
          page: pageNum,
          pages: Math.ceil(total / limitNum),
          limit: limitNum,
        },
      });
    } else {
      // Student: Get own profile only
      const student = await Student.findOne({ userId: req.user._id }).populate(
        "userId",
        "email role"
      );

      if (!student) {
        return res
          .status(404)
          .json({ success: false, message: "Student profile not found" });
      }

      res.json({
        success: true,
        students: [student],
        pagination: {
          total: 1,
          page: 1,
          pages: 1,
          limit: 1,
        },
      });
    }
  } catch (error) {
    console.error("Get students error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error fetching students" });
  }
};

// @desc    Get single student
// @route   GET /api/students/:id
// @access  Private
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate(
      "userId",
      "email role"
    );

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    // Students can only view their own profile
    if (
      req.user.role === "student" &&
      student.userId._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    res.json({ success: true, student });
  } catch (error) {
    console.error("Get student error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error fetching student" });
  }
};

// @desc    Create student
// @route   POST /api/students
// @access  Private (Admin only)
const createStudent = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, message: errors.array()[0].msg });
    }

    const { name, email, course, userId } = req.body;

    // Check if student with email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Student with this email already exists",
        });
    }

    // Verify userId exists
    if (userId) {
      const user = await User.findById(userId);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
    }

    const student = await Student.create({
      userId,
      name,
      email,
      course,
    });

    const populatedStudent = await Student.findById(student._id).populate(
      "userId",
      "email role"
    );

    res.status(201).json({ success: true, student: populatedStudent });
  } catch (error) {
    console.error("Create student error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error creating student" });
  }
};

// @desc    Update student
// @route   PUT /api/students/:id
// @access  Private (Admin or own profile)
const updateStudent = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, message: errors.array()[0].msg });
    }

    const student = await Student.findById(req.params.id);

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    // Check ownership: students can only update their own profile
    if (
      req.user.role === "student" &&
      student.userId.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Access denied. You can only update your own profile",
        });
    }

    const { name, email, course } = req.body;

    // Check if new email already exists for another student
    if (email && email !== student.email) {
      const existingStudent = await Student.findOne({
        email,
        _id: { $ne: req.params.id },
      });
      if (existingStudent) {
        return res
          .status(400)
          .json({
            success: false,
            message: "Student with this email already exists",
          });
      }
    }

    student.name = name || student.name;
    student.email = email || student.email;
    student.course = course || student.course;

    await student.save();

    const updatedStudent = await Student.findById(student._id).populate(
      "userId",
      "email role"
    );

    res.json({ success: true, student: updatedStudent });
  } catch (error) {
    console.error("Update student error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error updating student" });
  }
};

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Private (Admin only)
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    await student.deleteOne();

    res.json({ success: true, message: "Student deleted successfully" });
  } catch (error) {
    console.error("Delete student error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error deleting student" });
  }
};

export {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
