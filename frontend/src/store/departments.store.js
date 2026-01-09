import { create } from 'zustand';
import { departmentsAPI } from '../api/departments.api';

export const useDepartmentsStore = create((set) => ({
  departments: [],
  loading: false,
  error: null,

  fetchDepartments: async () => {
    set({ loading: true, error: null });
    try {
      const response = await departmentsAPI.getDepartments();
      set({ departments: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addDepartment: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await departmentsAPI.createDepartment(data);
      set(state => ({ 
        departments: [...state.departments, response.data], 
        loading: false 
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  updateDepartment: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const response = await departmentsAPI.updateDepartment(id, data);
      set(state => ({
        departments: state.departments.map(dept => 
          dept.id === id ? response.data : dept
        ),
        loading: false
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  deleteDepartment: async (id) => {
    set({ loading: true, error: null });
    try {
      await departmentsAPI.deleteDepartment(id);
      set(state => ({
        departments: state.departments.filter(dept => dept.id !== id),
        loading: false
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  }
}));