// Check if user is authenticated
export const isAuthenticated = () => {
    const token = localStorage.getItem('adminToken');
    return !!token;
  };
  
  // Get token from localStorage
  export const getToken = () => {
    return localStorage.getItem('adminToken');
  };
  
  // Set token in localStorage
  export const setToken = (token) => {
    localStorage.setItem('adminToken', token);
  };
  
  // Remove token from localStorage
  export const removeToken = () => {
    localStorage.removeItem('adminToken');
  };
  
  // Private route helper for React Router
  export const requireAuth = (navigate) => {
    if (!isAuthenticated()) {
      navigate('/login');
      return false;
    }
    return true;
  };
  
  // Format validation errors from API
  export const formatErrors = (error) => {
    if (error.response && error.response.data) {
      if (error.response.data.message) {
        return error.response.data.message;
      }
      if (error.response.data.errors) {
        return Object.values(error.response.data.errors).join(', ');
      }
    }
    return 'An unexpected error occurred. Please try again.';
  };