import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const TopCountriesChart = ({ data, loading }) => {
  if (loading) {
    return <div className="chart-loading">Loading top countries data...</div>;
  }

  if (!data || data.length === 0) {
    return <div className="chart-no-data">No top countries data available</div>;
  }

  // Sort data by count in descending order
  const sortedData = [...data].sort((a, b) => b.count - a.count);

  return (
    <div className="chart-container">
      <h3>Top 10 Countries by User Count</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={sortedData}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis 
            dataKey="country" 
            type="category" 
            tick={{ fontSize: 12 }}
            width={80}
          />
          <Tooltip 
            formatter={(value) => [`${value} users`, 'Count']}
            labelFormatter={(label) => `Country: ${label}`}
          />
          <Legend />
          <Bar dataKey="count" name="Number of Users" fill="#1e3d59" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <div className="chart-insights">
        <h4>Insights:</h4>
        <p>
          {sortedData.length > 0 ? (
            <>
              The top 3 countries ({sortedData.slice(0, 3).map(item => item.country).join(', ')}) 
              account for {
                Math.round((sortedData.slice(0, 3).reduce((sum, item) => sum + item.count, 0) / 
                sortedData.reduce((sum, item) => sum + item.count, 0)) * 100)
              }% of your user base.
            </>
          ) : 'No data available for insights.'}
        </p>
      </div>
    </div>
  );
};

export default TopCountriesChart;

