import { createContext, useContext, useState } from "react";
import studentService from "../services/studentService";
import { toast } from "react-toastify";

const StudentContext = createContext();

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudent must be used within StudentProvider");
  }
  return context;
};

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pages: 1,
    limit: 10,
  });

  const fetchStudents = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const data = await studentService.getStudents(page, limit);
      setStudents(data.students);
      setPagination(data.pagination);
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch students";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentById = async (id) => {
    setLoading(true);
    try {
      const data = await studentService.getStudentById(id);
      setCurrentStudent(data.student);
      return data.student;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch student";
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createStudent = async (studentData) => {
    setLoading(true);
    try {
      const data = await studentService.createStudent(studentData);
      toast.success("Student created successfully!");
      return data.student;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to create student";
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateStudent = async (id, studentData) => {
    setLoading(true);
    try {
      const data = await studentService.updateStudent(id, studentData);
      toast.success("Student updated successfully!");
      return data.student;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update student";
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id) => {
    setLoading(true);
    try {
      await studentService.deleteStudent(id);
      toast.success("Student deleted successfully!");
      // Remove from local state
      setStudents(students.filter((s) => s._id !== id));
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to delete student";
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    students,
    currentStudent,
    loading,
    pagination,
    fetchStudents,
    fetchStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
  };

  return (
    <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
  );
};
