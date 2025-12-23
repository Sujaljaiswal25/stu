import { useEffect, useState } from "react";
import { useStudent } from "../../context/StudentContext";
import { useAuth } from "../../context/AuthContext";
import ProfileCard from "../../components/student/ProfileCard";
import EditProfile from "../../components/student/EditProfile";
import Loader from "../../components/common/Loader";

const StudentDashboard = () => {
  const { students, loading, fetchStudents, updateStudent } = useStudent();
  const { changePassword } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState({});

  const student = students[0];

  useEffect(() => {
    fetchStudents(1, 1);
  }, []);

  const handleProfileUpdate = async (formData) => {
    try {
      if (student) {
        await updateStudent(student._id, formData);
        setEditMode(false);
        fetchStudents(1, 1);
      }
    } catch (error) {
      console.error("Profile update error:", error);
    }
  };

  const validatePasswordForm = () => {
    const errors = {};

    if (!passwordData.currentPassword) {
      errors.currentPassword = "Current password is required";
    }

    if (!passwordData.newPassword || passwordData.newPassword.length < 6) {
      errors.newPassword = "New password must be at least 6 characters";
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (!validatePasswordForm()) {
      return;
    }

    try {
      await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setShowPasswordForm(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPasswordErrors({});
    } catch (error) {
      console.error("Password change error:", error);
    }
  };

  const handlePasswordInputChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
    if (passwordErrors[e.target.name]) {
      setPasswordErrors({
        ...passwordErrors,
        [e.target.name]: "",
      });
    }
  };

  if (loading && !student) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl shadow-2xl p-8 mb-8">
          <h1 className="text-4xl font-extrabold mb-2">
            Welcome, {student?.name || "Student"}! 🎓
          </h1>
          <p className="text-purple-100 text-lg font-medium">
            Manage your profile and track your learning progress
          </p>
        </div>

        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
          My Dashboard
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {editMode ? (
              <EditProfile
                student={student}
                onSubmit={handleProfileUpdate}
                isLoading={loading}
              />
            ) : (
              <ProfileCard student={student} />
            )}

            <div className="mt-4">
              <button
                onClick={() => setEditMode(!editMode)}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-xl transform hover:scale-105 transition-all font-bold"
              >
                {editMode ? "Cancel" : "Edit Profile"}
              </button>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-l-4 border-orange-500">
              <h2 className="text-3xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-6">
                Change Password
              </h2>

              {!showPasswordForm ? (
                <button
                  onClick={() => setShowPasswordForm(true)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:shadow-xl transform hover:scale-105 transition-all font-bold"
                >
                  Change Password
                </button>
              ) : (
                <form onSubmit={handlePasswordChange}>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 mb-2 font-bold"
                      htmlFor="currentPassword"
                    >
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                        passwordErrors.currentPassword
                          ? "border-red-500"
                          : "border-gray-200"
                      }`}
                      placeholder="Enter current password"
                    />
                    {passwordErrors.currentPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {passwordErrors.currentPassword}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 mb-2 font-bold"
                      htmlFor="newPassword"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                        passwordErrors.newPassword
                          ? "border-red-500"
                          : "border-gray-200"
                      }`}
                      placeholder="Enter new password"
                    />
                    {passwordErrors.newPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {passwordErrors.newPassword}
                      </p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label
                      className="block text-gray-700 mb-2 font-bold"
                      htmlFor="confirmPassword"
                    >
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                        passwordErrors.confirmPassword
                          ? "border-red-500"
                          : "border-gray-200"
                      }`}
                      placeholder="Confirm new password"
                    />
                    {passwordErrors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {passwordErrors.confirmPassword}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowPasswordForm(false);
                        setPasswordData({
                          currentPassword: "",
                          newPassword: "",
                          confirmPassword: "",
                        });
                        setPasswordErrors({});
                      }}
                      className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-bold transition-all border-2 border-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:shadow-xl transform hover:scale-105 transition-all font-bold"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
