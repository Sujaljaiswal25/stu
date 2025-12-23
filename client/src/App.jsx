import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { StudentProvider } from "./context/StudentContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/common/Navbar";
import PrivateRoute from "./components/common/PrivateRoute";
import RoleRoute from "./components/common/RoleRoute";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <StudentProvider>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              <Route
                path="/admin/dashboard"
                element={
                  <PrivateRoute>
                    <RoleRoute allowedRoles={["admin"]}>
                      <AdminDashboard />
                    </RoleRoute>
                  </PrivateRoute>
                }
              />

              <Route
                path="/student/dashboard"
                element={
                  <PrivateRoute>
                    <RoleRoute allowedRoles={["student"]}>
                      <StudentDashboard />
                    </RoleRoute>
                  </PrivateRoute>
                }
              />

              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </StudentProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
