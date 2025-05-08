import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create context
export const AuthContext = createContext();

// API base URL - adjust according to your backend URL
const API_URL = 'http://localhost:3000';

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        
        if (!token) {
          setLoading(false);
          return;
        }

        // Set default headers for all axios requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Verify token and get user data
        const response = await axios.get(`${API_URL}/api/admin/me`);
        
        if (response.data && response.data.user) {
          setCurrentUser(response.data.user);
        }
      } catch (err) {
        console.error('Auth verification error:', err);
        // Clear invalid token
        localStorage.removeItem('adminToken');
        axios.defaults.headers.common['Authorization'] = '';
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Register user
  const register = async (userData) => {
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/api/admin/register`, userData);
      
      // Save token to localStorage
      localStorage.setItem('adminToken', response.data.token);
      
      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      
      // Set user state
      setCurrentUser(response.data.user);
      
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    }
  };

  // Login user
  const login = async (userData) => {
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/api/admin/login`, userData);
      
      // Save token to localStorage
      localStorage.setItem('adminToken', response.data.token);
      
      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      
      // Set user state
      setCurrentUser(response.data.user);
      
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    }
  };

  // Logout user
  const logout = async () => {
    try {
      // Optional: Call logout endpoint if you need server-side logout handling
      await axios.post(`${API_URL}/api/admin/logout`);
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      // Clear token from localStorage
      localStorage.removeItem('adminToken');
      
      // Clear axios default header
      axios.defaults.headers.common['Authorization'] = '';
      
      // Clear user state
      setCurrentUser(null);
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    register,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};