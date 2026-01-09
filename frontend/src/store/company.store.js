import { create } from 'zustand';
import { companyAPI } from '../api/company.api';

export const useCompanyStore = create((set) => ({
  config: null,
  tenant: null,
  loading: false,
  error: null,

  fetchConfig: async () => {
    set({ loading: true, error: null });
    try {
      const response = await companyAPI.getConfig();
      set({ config: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  updateConfig: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await companyAPI.updateConfig(data);
      set({ config: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchTenant: async () => {
    set({ loading: true, error: null });
    try {
      const response = await companyAPI.getTenant();
      set({ tenant: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  }
}));