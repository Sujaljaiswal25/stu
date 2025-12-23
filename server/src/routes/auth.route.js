import express from "express";
import { body } from "express-validator";
import {
  signup,
  login,
  getMe,
  changePassword,
  logout,
} from "../controllers/auth.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Validation rules
const signupValidation = [
  body("name")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters"),
  body("email").isEmail().normalizeEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("course").trim().notEmpty().withMessage("Course is required"),
];

const loginValidation = [
  body("email").isEmail().normalizeEmail().withMessage("Invalid email address"),
  body("password").notEmpty().withMessage("Password is required"),
];

const changePasswordValidation = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters"),
];

// Routes
router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.get("/me", auth, getMe);
router.post("/change-password", auth, changePasswordValidation, changePassword);
router.post("/logout", auth, logout);

export default router;
