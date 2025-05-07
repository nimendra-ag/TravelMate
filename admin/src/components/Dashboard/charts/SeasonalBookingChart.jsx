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
  Line,
  ComposedChart
} from 'recharts';

const SeasonalBookingChart = ({ data, loading, year, onYearChange }) => {
  const [displayMetric, setDisplayMetric] = useState('bookingCount');
  
  if (loading) {
    return <div className="chart-loading">Loading seasonal booking data...</div>;
  }
  
  if (!data || data.length === 0) {
    return <div className="chart-no-data">No seasonal booking data available</div>;
  }
  
  // Find peak and low seasons
  const peakMonth = [...data].sort((a, b) => b.bookingCount - a.bookingCount)[0];
  const lowMonth = [...data].sort((a, b) => a.bookingCount - b.bookingCount)
    .filter(item => item.bookingCount > 0)[0] || data[0];
  
  const getMetricLabel = () => {
    switch(displayMetric) {
      case 'bookingCount': return 'Booking Count';
      case 'revenue': return 'Revenue ($)';
      case 'avgDuration': return 'Avg. Stay (days)';
      default: return 'Booking Count';
    }
  };
  
  const getBarColor = () => {
    switch(displayMetric) {
      case 'bookingCount': return '#8884d8';
      case 'revenue': return '#82ca9d';
      case 'avgDuration': return '#ffc658';
      default: return '#8884d8';
    }
  };
  
  const handleYearChange = (e) => {
    onYearChange(parseInt(e.target.value));
  };
  
  return (
    <div className="chart-container seasonal-chart">
      <div className="chart-header">
        <h3>Seasonal Booking Patterns</h3>
        <div className="chart-controls">
          <select 
            value={displayMetric} 
            onChange={(e) => setDisplayMetric(e.target.value)}
            className="metric-selector"
          >
            <option value="bookingCount">Booking Count</option>
            <option value="revenue">Revenue</option>
            <option value="avgDuration">Average Stay Duration</option>
          </select>
          
          <select 
            value={year} 
            onChange={handleYearChange}
            className="year-selector"
          >
            {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="chart-insights">
        <div className="insight-item">
          <span className="insight-label">Peak Season:</span>
          <span className="insight-value">{peakMonth.month}</span>
        </div>
        <div className="insight-item">
          <span className="insight-label">Low Season:</span>
          <span className="insight-value">{lowMonth.month}</span>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis label={{ value: getMetricLabel(), angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar 
            dataKey={displayMetric} 
            name={getMetricLabel()} 
            fill={getBarColor()} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SeasonalBookingChart;
