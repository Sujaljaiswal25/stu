import api from "./api";

const studentService = {
  getStudents: async (page = 1, limit = 10) => {
    const response = await api.get(`/students?page=${page}&limit=${limit}`);
    return response.data;
  },

  getStudentById: async (id) => {
    const response = await api.get(`/students/${id}`);
    return response.data;
  },

  createStudent: async (data) => {
    const response = await api.post("/students", data);
    return response.data;
  },

  updateStudent: async (id, data) => {
    const response = await api.put(`/students/${id}`, data);
    return response.data;
  },

  deleteStudent: async (id) => {
    const response = await api.delete(`/students/${id}`);
    return response.data;
  },
};

export default studentService;
