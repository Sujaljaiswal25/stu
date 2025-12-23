import { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/authService";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user on mount
  useEffect(() => {
    const loadUser = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          const data = await authService.getCurrentUser();
          setUser(data.user);
          setToken(storedToken);
          setIsAuthenticated(true);
        } catch (error) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setToken(null);
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const signup = async (userData) => {
    try {
      const data = await authService.signup(userData);
      setUser(data.user);
      setToken(data.token);
      setIsAuthenticated(true);
      toast.success("Account created successfully!");
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Signup failed";
      toast.error(message);
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      const data = await authService.login(credentials);
      setUser(data.user);
      setToken(data.token);
      setIsAuthenticated(true);
      toast.success("Logged in successfully!");
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setToken(null);
      setIsAuthenticated(false);
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const changePassword = async (passwordData) => {
    try {
      await authService.changePassword(passwordData);
      toast.success("Password changed successfully!");
    } catch (error) {
      const message = error.response?.data?.message || "Password change failed";
      toast.error(message);
      throw error;
    }
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    signup,
    login,
    logout,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
