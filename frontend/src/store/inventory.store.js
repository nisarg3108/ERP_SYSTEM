import { create } from 'zustand';
import { inventoryAPI } from '../api/inventory.api';

export const useInventoryStore = create((set, get) => ({
  items: [],
  loading: false,
  error: null,

  fetchItems: async () => {
    set({ loading: true, error: null });
    try {
      const response = await inventoryAPI.getItems();
      set({ items: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addItem: async (itemData) => {
    set({ loading: true, error: null });
    try {
      const response = await inventoryAPI.createItem(itemData);
      set(state => ({ 
        items: [...state.items, response.data], 
        loading: false 
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  updateItem: async (id, itemData) => {
    set({ loading: true, error: null });
    try {
      const response = await inventoryAPI.updateItem(id, itemData);
      set(state => ({
        items: state.items.map(item => 
          item.id === id ? response.data : item
        ),
        loading: false
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  deleteItem: async (id) => {
    set({ loading: true, error: null });
    try {
      await inventoryAPI.deleteItem(id);
      set(state => ({
        items: state.items.filter(item => item.id !== id),
        loading: false
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  }
}));