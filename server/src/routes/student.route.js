import express from "express";
import { body } from "express-validator";
import {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/student.controller.js";
import auth from "../middlewares/auth.middleware.js";
import roleCheck from "../middlewares/role.middleware.js";

const router = express.Router();

// Validation rules
const studentValidation = [
  body("name")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters"),
  body("email").isEmail().normalizeEmail().withMessage("Invalid email address"),
  body("course").trim().notEmpty().withMessage("Course is required"),
];

// Routes
router.get("/", auth, getStudents);
router.get("/:id", auth, getStudentById);
router.post("/", auth, roleCheck("admin"), studentValidation, createStudent);
router.put("/:id", auth, studentValidation, updateStudent);
router.delete("/:id", auth, roleCheck("admin"), deleteStudent);

export default router;
