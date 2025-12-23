import { useState, useEffect } from "react";

const EditProfile = ({ student, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || "",
        email: student.email || "",
        course: student.course || "",
      });
    }
  }, [student]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.course || formData.course.trim().length === 0) {
      newErrors.course = "Course is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    await onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 border-l-4 border-blue-500">
      <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
        Edit Profile
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-bold" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              errors.name ? "border-red-500" : "border-gray-200"
            }`}
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-bold" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              errors.email ? "border-red-500" : "border-gray-200"
            }`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 mb-2 font-bold"
            htmlFor="course"
          >
            Course
          </label>
          <select
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              errors.course ? "border-red-500" : "border-gray-200"
            }`}
          >
            <option value="">Select a course</option>
            <option value="MERN Stack Development">
              MERN Stack Development
            </option>
            <option value="Full Stack Web Development">
              Full Stack Web Development
            </option>
            <option value="Frontend Development">Frontend Development</option>
            <option value="Backend Development">Backend Development</option>
            <option value="Data Science & Analytics">
              Data Science & Analytics
            </option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="DevOps Engineering">DevOps Engineering</option>
            <option value="Mobile App Development">
              Mobile App Development
            </option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Python Programming">Python Programming</option>
          </select>
          {errors.course && (
            <p className="text-red-500 text-sm mt-1">{errors.course}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed font-bold transform hover:scale-105 transition-all"
        >
          {isLoading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
