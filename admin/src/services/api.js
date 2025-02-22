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
