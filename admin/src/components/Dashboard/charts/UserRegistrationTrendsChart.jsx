import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import moment from 'moment';

const UserRegistrationTrendsChart = ({ data, loading, onPeriodChange }) => {
  const [timeframe, setTimeframe] = useState('monthly');
  
  if (loading) {
    return <div className="chart-loading">Loading registration trends data...</div>;
  }

  if (!data || data.length === 0) {
    return <div className="chart-no-data">No registration trends data available</div>;
  }

  // Format dates based on timeframe
  const formatData = () => {
    return data.map(item => {
      let formattedDate;
      
      if (timeframe === 'daily') {
        formattedDate = moment(item.date).format('MMM D, YYYY');
      } else if (timeframe === 'weekly') {
        formattedDate = `Week ${moment(item.date).format('W, YYYY')}`;
      } else {
        formattedDate = moment(item.date).format('MMM YYYY');
      }
      
      return {
        ...item,
        formattedDate
      };
    });
  };

  const formattedData = formatData();
  
  // Calculate growth rate
  const calculateGrowth = () => {
    if (formattedData.length < 2) return 'N/A';
    
    const oldestValue = formattedData[0].count;
    const newestValue = formattedData[formattedData.length - 1].count;
    
    if (oldestValue === 0) return 'N/A';
    
    const growthRate = ((newestValue - oldestValue) / oldestValue) * 100;
    return growthRate.toFixed(1) + '%';
  };

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
    if (onPeriodChange) {
      onPeriodChange(newTimeframe);
    }
  };

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>User Registration Trends</h3>
        <div className="chart-controls">
          <button 
            className={`chart-control-btn ${timeframe === 'daily' ? 'active' : ''}`}
            onClick={() => handleTimeframeChange('daily')}
          >
            Daily
          </button>
          <button 
            className={`chart-control-btn ${timeframe === 'weekly' ? 'active' : ''}`}
            onClick={() => handleTimeframeChange('weekly')}
          >
            Weekly
          </button>
          <button 
            className={`chart-control-btn ${timeframe === 'monthly' ? 'active' : ''}`}
            onClick={() => handleTimeframeChange('monthly')}
          >
            Monthly
          </button>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={formattedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="formattedDate" 
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={70}
          />
          <YAxis />
          <Tooltip 
            formatter={(value) => [`${value} users`, 'New Registrations']}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="count" 
            name="New Registrations" 
            stroke="#1e3d59" 
            activeDot={{ r: 8 }} 
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="chart-insights">
        <h4>Insights:</h4>
        <p>
          {formattedData.length > 0 ? (
            <>
              Total of {formattedData.reduce((sum, item) => sum + item.count, 0)} users registered over this period.
              Growth rate: {calculateGrowth()} compared to the beginning of the period.
              {formattedData.length > 1 && 
                ` Peak registration was in ${
                  formattedData.reduce((prev, current) => 
                    (prev.count > current.count) ? prev : current
                  ).formattedDate
                } with ${
                  formattedData.reduce((prev, current) => 
                    (prev.count > current.count) ? prev : current
                  ).count
                } new users.`
              }
            </>
          ) : 'No data available for insights.'}
        </p>
      </div>
    </div>
  );
};

export default UserRegistrationTrendsChart;
