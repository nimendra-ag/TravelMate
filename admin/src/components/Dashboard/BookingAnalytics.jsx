import React, { useState, useEffect } from 'react';
import { fetchAllBookingAnalytics } from '../../services/bookingAnalyticsService';
import SeasonalBookingChart from './charts/SeasonalBookingChart';
import BookingStatusChart from './charts/BookingStatusChart';
import DailyBookingActivityChart from './charts/DailyBookingActivityChart';
import './BookingAnalytics.css';

const BookingAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    seasonalPatterns: [],
    statusOverview: [],
    dailyActivity: {
      dayOfWeek: [],
      hourly: []
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const loadAnalyticsData = async () => {
      try {
        setLoading(true);
        const data = await fetchAllBookingAnalytics(selectedYear);
        setAnalyticsData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load analytics data. Please try again later.');
        console.error('Error loading analytics data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAnalyticsData();
  }, [selectedYear]);

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  if (error) {
    return <div className="analytics-error">{error}</div>;
  }

  return (
    <div className="booking-analytics-container">
      <div className="analytics-header">
        <h2>Booking Analytics Dashboard</h2>
        <p>Comprehensive overview of booking patterns and performance metrics</p>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card">
          <SeasonalBookingChart 
            data={analyticsData.seasonalPatterns} 
            loading={loading} 
            year={selectedYear}
            onYearChange={handleYearChange}
          />
        </div>

        <div className="analytics-card">
          <BookingStatusChart 
            data={analyticsData.statusOverview} 
            loading={loading} 
          />
        </div>

        <div className="analytics-card full-width">
          <DailyBookingActivityChart 
            data={analyticsData.dailyActivity} 
            loading={loading} 
          />
        </div>
      </div>
    </div>
  );
};

export default BookingAnalytics;
