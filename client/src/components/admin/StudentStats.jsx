const StudentStats = ({ total, students }) => {
  // Calculate unique courses
  const uniqueCourses = students
    ? new Set(students.map((s) => s.course)).size
    : 0;

  // Calculate students enrolled this month
  const thisMonth = students
    ? students.filter((s) => {
        const enrollDate = new Date(s.enrollmentDate);
        const now = new Date();
        return (
          enrollDate.getMonth() === now.getMonth() &&
          enrollDate.getFullYear() === now.getFullYear()
        );
      }).length
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 border-l-4 border-purple-500">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">
              Total Students
            </h3>
            <p className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mt-2">
              {total}
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl shadow-lg">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 border-l-4 border-blue-500">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">
              Active Courses
            </h3>
            <p className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mt-2">
              {uniqueCourses}
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-4 rounded-2xl shadow-lg">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 border-l-4 border-orange-500">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">
              This Month
            </h3>
            <p className="text-5xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mt-2">
              {thisMonth}
            </p>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-red-500 p-4 rounded-2xl shadow-lg">
            <svg
              className="w-8 h-8 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentStats;
