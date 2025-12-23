import { useState } from "react";
import ConfirmDialog from "../common/ConfirmDialog";

const StudentList = ({ students, onEdit, onDelete }) => {
  const [deleteId, setDeleteId] = useState(null);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
  };

  const handleConfirmDelete = async () => {
    if (deleteId) {
      await onDelete(deleteId);
      setDeleteId(null);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <div className="overflow-x-auto rounded-2xl shadow-xl">
        <table className="min-w-full bg-white">
          <thead className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
            <tr>
              <th className="px-6 py-5 text-left text-xs font-extrabold uppercase tracking-wider text-white">
                Name
              </th>
              <th className="px-6 py-5 text-left text-xs font-extrabold uppercase tracking-wider text-white">
                Email
              </th>
              <th className="px-6 py-5 text-left text-xs font-extrabold uppercase tracking-wider text-white">
                Course
              </th>
              <th className="px-6 py-5 text-left text-xs font-extrabold uppercase tracking-wider text-white">
                Enrollment Date
              </th>
              <th className="px-6 py-5 text-left text-xs font-extrabold uppercase tracking-wider text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {students.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No students found
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr
                  key={student._id}
                  className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all"
                >
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-800">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600 font-medium">
                    {student.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs font-bold shadow-md">
                      {student.course}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600 font-medium">
                    {formatDate(student.enrollmentDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => onEdit(student)}
                      className="text-blue-600 hover:text-blue-800 mr-4 font-bold hover:underline transform hover:scale-110 transition-transform"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(student._id)}
                      className="text-red-600 hover:text-red-800 font-bold hover:underline transform hover:scale-110 transition-transform"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        isOpen={deleteId !== null}
        title="Delete Student"
        message="Are you sure you want to delete this student? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </>
  );
};

export default StudentList;
