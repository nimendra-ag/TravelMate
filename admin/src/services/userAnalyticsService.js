import axios from 'axios';

const API_URL = 'http://localhost:3000/api/user-analytics';

export const fetchAllUserAnalytics = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user analytics:', error);
    throw error;
  }
};

export const fetchAgeDistribution = async () => {
  try {
    const response = await axios.get(`${API_URL}/age-distribution`);
    return response.data;
  } catch (error) {
    console.error('Error fetching age distribution:', error);
    throw error;
  }
};

export const fetchGenderDistribution = async () => {
  try {
    const response = await axios.get(`${API_URL}/gender-distribution`);
    return response.data;
  } catch (error) {
    console.error('Error fetching gender distribution:', error);
    throw error;
  }
};

export const fetchGeographicDistribution = async () => {
  try {
    const response = await axios.get(`${API_URL}/geographic-distribution`);
    return response.data;
  } catch (error) {
    console.error('Error fetching geographic distribution:', error);
    throw error;
  }
};

export const fetchTopCountries = async () => {
  try {
    const response = await axios.get(`${API_URL}/top-countries`);
    return response.data;
  } catch (error) {
    console.error('Error fetching top countries:', error);
    throw error;
  }
};

export const fetchUserRegistrationTrends = async (period = 'monthly') => {
  try {
    const response = await axios.get(`${API_URL}/registration-trends?period=${period}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching registration trends:', error);
    throw error;
  }
};
