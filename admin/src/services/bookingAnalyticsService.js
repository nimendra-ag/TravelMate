import axios from 'axios';

const API_URL = 'http://localhost:3000/api/booking-analytics';

export const fetchAllBookingAnalytics = async (year = new Date().getFullYear()) => {
  try {
    const response = await axios.get(`${API_URL}/all?year=${year}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching booking analytics:', error);
    throw error;
  }
};

export const fetchSeasonalPatterns = async (year = new Date().getFullYear()) => {
  try {
    const response = await axios.get(`${API_URL}/seasonal-patterns?year=${year}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching seasonal patterns:', error);
    throw error;
  }
};

export const fetchStatusOverview = async () => {
  try {
    const response = await axios.get(`${API_URL}/status-overview`);
    return response.data;
  } catch (error) {
    console.error('Error fetching status overview:', error);
    throw error;
  }
};

export const fetchDailyActivity = async () => {
  try {
    const response = await axios.get(`${API_URL}/daily-activity`);
    return response.data;
  } catch (error) {
    console.error('Error fetching daily activity:', error);
    throw error;
  }
};
