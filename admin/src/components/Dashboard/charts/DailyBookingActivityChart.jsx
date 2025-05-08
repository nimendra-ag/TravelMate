import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

const DailyBookingActivityChart = ({ data, loading }) => {
  const [activeView, setActiveView] = useState('dayOfWeek');
  
  if (loading) {
    return <div className="chart-loading">Loading daily booking activity data...</div>;
  }
  
  if (!data || !data.dayOfWeek || !data.hourly) {
    return <div className="chart-no-data">No daily booking activity data available</div>;
  }
  
  // Find peak day and hour
  const peakDay = [...data.dayOfWeek].sort((a, b) => b.bookingCount - a.bookingCount)[0];
  const peakHour = [...data.hourly].sort((a, b) => b.bookingCount - a.bookingCount)[0];
  
  return (
    <div className="chart-container daily-activity-chart">
      <div className="chart-header">
        <h3>Daily Booking Activity</h3>
        <div className="chart-controls">
          <button 
            className={`view-button ${activeView === 'dayOfWeek' ? 'active' : ''}`}
            onClick={() => setActiveView('dayOfWeek')}
          >
            Day of Week
          </button>
          <button 
            className={`view-button ${activeView === 'hourly' ? 'active' : ''}`}
            onClick={() => setActiveView('hourly')}
          >
            Time of Day
          </button>
        </div>
      </div>
      
      <div className="chart-insights">
        {activeView === 'dayOfWeek' ? (
          <div className="insight-item">
            <span className="insight-label">Peak Booking Day:</span>
            <span className="insight-value">{peakDay.day}</span>
          </div>
        ) : (
          <div className="insight-item">
            <span className="insight-label">Peak Booking Time:</span>
            <span className="insight-value">{peakHour.hour}</span>
          </div>
        )}
      </div>
      
      {activeView === 'dayOfWeek' ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data.dayOfWeek}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="bookingCount" name="Booking Count" fill="#8884d8" />
            <Bar yAxisId="right" dataKey="revenue" name="Revenue ($)" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data.hourly}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="bookingCount" name="Booking Count" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default DailyBookingActivityChart;
