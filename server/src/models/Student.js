import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: 2,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    trim: true,
  },
  course: {
    type: String,
    required: [true, "Course is required"],
    trim: true,
  },
  enrollmentDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Student", studentSchema);
