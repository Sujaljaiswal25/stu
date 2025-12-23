import { useEffect, useState } from "react";
import { useStudent } from "../../context/StudentContext";
import { useAuth } from "../../context/AuthContext";
import StudentStats from "../../components/admin/StudentStats";
import StudentList from "../../components/admin/StudentList";
import StudentForm from "../../components/admin/StudentForm";
import Pagination from "../../components/common/Pagination";
import Loader from "../../components/common/Loader";

const AdminDashboard = () => {
  const { user } = useAuth();
  const {
    students,
    loading,
    pagination,
    fetchStudents,
    createStudent,
    updateStudent,
    deleteStudent,
  } = useStudent();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchStudents(currentPage, 10);
  }, [currentPage]);

  const handleAddClick = () => {
    setSelectedStudent(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (selectedStudent) {
        await updateStudent(selectedStudent._id, formData);
      } else {
        await createStudent(formData);
      }
      setIsFormOpen(false);
      setSelectedStudent(null);
      fetchStudents(currentPage, 10);
    } catch (error) {
      console.error("Form submit error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      fetchStudents(currentPage, 10);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading && students.length === 0) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white rounded-2xl shadow-2xl p-8 mb-8">
          <h1 className="text-4xl font-extrabold mb-2">Welcome, Admin 👋</h1>
          <p className="text-purple-100 text-lg font-medium">
            Manage your student database and monitor enrollment statistics
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Student Management
          </h2>
          <button
            onClick={handleAddClick}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2 font-bold"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add Student
          </button>
        </div>

        <StudentStats total={pagination.total} students={students} />

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Students</h2>
          <StudentList
            students={students}
            onEdit={handleEditClick}
            onDelete={handleDelete}
          />
          <Pagination pagination={pagination} onPageChange={handlePageChange} />
        </div>

        <StudentForm
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedStudent(null);
          }}
          onSubmit={handleFormSubmit}
          student={selectedStudent}
          isLoading={loading}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
