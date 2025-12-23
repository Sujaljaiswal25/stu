const ProfileCard = ({ student }) => {
  if (!student) return null;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 border-l-4 border-purple-500">
      <h2 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
        Profile Information
      </h2>
      <div className="space-y-5">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
          <label className="text-gray-500 text-xs font-bold uppercase tracking-wider">
            Name
          </label>
          <p className="text-xl font-extrabold text-gray-800 mt-1">
            {student.name}
          </p>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl">
          <label className="text-gray-500 text-xs font-bold uppercase tracking-wider">
            Email
          </label>
          <p className="text-xl font-extrabold text-gray-800 mt-1">
            {student.email}
          </p>
        </div>
        <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl">
          <label className="text-gray-500 text-xs font-bold uppercase tracking-wider">
            Course
          </label>
          <p className="text-xl font-extrabold text-gray-800 mt-1">
            {student.course}
          </p>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
          <label className="text-gray-500 text-xs font-bold uppercase tracking-wider">
            Enrollment Date
          </label>
          <p className="text-xl font-extrabold text-gray-800 mt-1">
            {formatDate(student.enrollmentDate)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
