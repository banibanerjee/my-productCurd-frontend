// src/stores/authStore.js
import { create } from "zustand";
import axios from "axios";
import { BASE_URL } from "../config"

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,

  register: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${BASE_URL}/api/user/register`, data);
      alert(res.data.message);
      set({ loading: false });
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || err.message });
      alert(`Register Error: ${err.response?.data?.message}`);
    }
  },

  login: async (phno, password) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(
        `${BASE_URL}/api/user/login`,
        { phno, password },
        { withCredentials: true }
      );

      set({ user: res.data.user, loading: false });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Login successful");
      return true; // ✅ success হলে true return

    } catch (err) {
      set({ loading: false });

      if (err.response?.status === 404) {
        alert("You are not registered. Please register first.");
      } else if (err.response?.status === 401) {
        alert("Incorrect password.");
      } else {
        alert("Login failed: " + (err.response?.data?.message || err.message));
      }

      return false; // ❌ fail হলে false return
    }
  },

  logout: async () => {
    try {
      await axios.post(`${BASE_URL}/api/user/logout`, {}, { withCredentials: true });
    } catch (err) {
      console.warn("Logout warn:", err);
    }
    set({ user: null });
    localStorage.removeItem("user");
    alert("Logged out");
  },

  fetchProfile: async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/user/profile`, {
        withCredentials: true,
      });
      set({ user: res.data.user });
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (err) {
      console.error("Profile fetch error:", err);
      set({ user: null });
      localStorage.removeItem("user");
    }
  },
}));

export default useAuthStore;
