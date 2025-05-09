import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

// Your backend base URL
const API_URL = 'http://localhost:3000';

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper to get config with Authorization header
  const getAuthConfig = () => {
    const token = localStorage.getItem('adminToken');
    return token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {};
  };

  // Check login on mount
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const config = getAuthConfig();
        if (!config.headers) {
          setLoading(false);
          return;
        }

        const response = await axios.get(`${API_URL}/api/admin/me`, config);

        if (response.data && response.data.user) {
          setCurrentUser(response.data.user);
        }
      } catch (err) {
        console.error('Auth verification error:', err);
        localStorage.removeItem('adminToken');
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Register
  const register = async (userData) => {
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/api/admin/register`, userData);

      localStorage.setItem('adminToken', response.data.token);
      setCurrentUser(response.data.user);

      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    }
  };

  // Login
  const login = async (userData) => {
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/api/admin/login`, userData);

      localStorage.setItem('adminToken', response.data.token);
      setCurrentUser(response.data.user);

      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    }
  };

  // Logout
  const logout = async () => {
    try {
      const config = getAuthConfig();
      await axios.post(`${API_URL}/api/admin/logout`, {}, config);
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('adminToken');
      setCurrentUser(null);
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    register,
    login,
    logout,
    getAuthConfig, // Exporting helper in case other components need it
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
