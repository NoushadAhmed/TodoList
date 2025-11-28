// src/hooks/useAuth.js
import { useState } from "react";
import * as authApi from "../api/auth";

export function useAuth() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [token, setToken] = useState(
    () => localStorage.getItem("token") || ""
  );

  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authMode, setAuthMode] = useState("login"); // 'login' | 'register'

  const login = async (email, password) => {
    setAuthError("");
    try {
      setAuthLoading(true);
      const data = await authApi.login(email.trim(), password.trim());

      setUser(data.user);
      setToken(data.token);

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
    } catch (err) {
      console.error("Login error:", err);
      setAuthError(err.message || "Login failed");
    } finally {
      setAuthLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setAuthError("");
    try {
      setAuthLoading(true);
      const data = await authApi.register(
        name.trim(),
        email.trim(),
        password.trim()
      );

      setUser(data.user);
      setToken(data.token);

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
    } catch (err) {
      console.error("Register error:", err);
      setAuthError(err.message || "Registration failed");
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return {
    user,
    token,
    authMode,
    setAuthMode,
    authLoading,
    authError,
    setAuthError,
    login,
    register,
    logout,
  };
}
