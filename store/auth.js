import { defineStore } from "pinia";

export const userAuthStore = defineStore({
  id: "auth",
  state: () => ({
    isAuthenticated: false,
    user: null,
    justRegistered: false,
  }),
  actions: {
    setJustRegistered(value) {
      this.justRegistered = value;
    },
    async login(loginData) {
      try {
        const response = await fetch("http://localhost:8080/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
          credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Gagal login.");
        }
        this.isAuthenticated = true;
        this.user = data.user;
      } catch (error) {
        throw error;
      }
    },
    async register(registerData) {
      try {
        const response = await fetch("http://localhost:8080/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerData),
        });
        const data = await response.json();
        if (!response.ok) {
          const error = new Error(data.message || "Gagal register.");
          error.status = response.status;
          throw error;
        }
        this.justRegistered = true;
      } catch (error) {
        throw error;
      }
    },
    async logout() {
      try {
        const response = await fetch("http://localhost:8080/users/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Gagal logout.");
        }
        this.isAuthenticated = false;
        this.user = null;
      } catch (error) {
        throw error;
      }
    },
  },
  persist: true,
});
