import { create } from "zustand";
import axios from "axios";
import { BASE_URL } from "../config"

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${BASE_URL}/api/products/all`, {
        withCredentials: true
      });
      set({ products: response.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));
export const useSingleProductStore = create((set) => ({
  product: null,
  loading: false,
  error: null,

  fetchProductById: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${BASE_URL}/api/products/${id}`);
      set({ product: res.data, loading: false });
    } catch (err) {
      set({ error: 'Failed to fetch product', loading: false });
    }
  },
}));



