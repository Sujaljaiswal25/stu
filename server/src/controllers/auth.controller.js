import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import User from "../models/User.js";
import Student from "../models/Student.js";
import generateToken from "../utils/token.util.js";

// @desc    Register user and create student profile
// @route   POST /api/auth/signup
// @access  Public
const signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, message: errors.array()[0].msg });
    }

    const { name, email, password, course, role } = req.body;

    // Validate role
    const userRole =
      role && ["admin", "student"].includes(role) ? role : "student";

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Hash password with proper salt rounds
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user with validated role
    const user = await User.create({
      email,
      password: hashedPassword,
      role: userRole,
    });

    // Create student profile only for student role
    let student = null;
    if (userRole === "student") {
      student = await Student.create({
        userId: user._id,
        name,
        email,
        course,
      });
    }

    // Generate token
    const token = generateToken(user._id);

    const response = {
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        name: userRole === "admin" ? name : undefined,
      },
    };

    // Include student data only if student role
    if (student) {
      response.student = {
        id: student._id,
        name: student.name,
        email: student.email,
        course: student.course,
      };
    }

    res.status(201).json(response);
  } catch (error) {
    console.error("Signup error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error during signup" });
  }
};

// @desc    Authenticate user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, message: errors.array()[0].msg });
    }

    const { email, password } = req.body;

    // Find user with password
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error during login" });
  }
};

// @desc    Get current user info
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = {
      id: req.user._id,
      email: req.user.email,
      role: req.user.role,
    };

    // Get student profile if user is a student
    if (req.user.role === "student") {
      const student = await Student.findOne({ userId: req.user._id });
      if (student) {
        user.student = {
          id: student._id,
          name: student.name,
          email: student.email,
          course: student.course,
          enrollmentDate: student.enrollmentDate,
        };
      }
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error("Get me error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error fetching user" });
  }
};

// @desc    Change password
// @route   POST /api/auth/change-password
// @access  Private
const changePassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, message: errors.array()[0].msg });
    }

    const { currentPassword, newPassword } = req.body;

    // Get user with password
    const user = await User.findById(req.user._id).select("+password");

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Current password is incorrect" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error changing password" });
  }
};

// @desc    Logout user (client-side)
// @route   POST /api/auth/logout
// @access  Private
const logout = (req, res) => {
  res.json({ success: true, message: "Logged out successfully" });
};

export { signup, login, getMe, changePassword, logout };
