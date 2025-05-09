

import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/travelmate';

export const fetchAnalyticsData = {
    getPriceDistribution: () => axios.get(`${API_BASE_URL}/price-distribution`),
    getAvailabilityStatus: () => axios.get(`${API_BASE_URL}/availability`),
    getLocationData: () => axios.get(`${API_BASE_URL}/location-data`),
    getPopularCategories: () => axios.get(`${API_BASE_URL}/popular-categories`),
    getPriceRatingData: () => axios.get(`${API_BASE_URL}/price-rating`),
    getAreaAccommodations: () => axios.get(`${API_BASE_URL}/area-count`)
};


const API_URL = 'http://localhost:3000/api';

export const fetchDestinations = async () => {
  try {
    const response = await axios.get(`${API_URL}/destination-analytics/destinations`);
    return response.data;
  } catch (error) {
    console.error('Error fetching destinations:', error);
    throw error;
  }
};

export const fetchDestinationStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/destination-analytics/destinations/stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching destination stats:', error);
    throw error;
  }
};

// Function to fetch transportation analytics
export const getTransportationAnalytics = async () => {
  try {
    const response = await axios.get(`${API_URL}/transportation-analytics/analytics`);
    return response.data; // Assuming the API returns the necessary data for analytics
  } catch (error) {
    console.error("Error fetching transportation analytics", error);
    throw error;
  }
};