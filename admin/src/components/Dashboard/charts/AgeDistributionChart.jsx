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

const AgeDistributionChart = ({ data, loading }) => {
  if (loading) {
    return <div className="chart-loading">Loading age distribution data...</div>;
  }

  if (!data || data.length === 0) {
    return <div className="chart-no-data">No age distribution data available</div>;
  }

  // Sort age groups in ascending order
  const sortedData = [...data].sort((a, b) => {
    const ageA = parseInt(a.ageGroup.split('-')[0]);
    const ageB = parseInt(b.ageGroup.split('-')[0]);
    return ageA - ageB;
  });

  return (
    <div className="chart-container">
      <h3>User Age Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={sortedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="ageGroup" />
          <YAxis />
          <Tooltip 
            formatter={(value) => [`${value} users`, 'Count']}
            labelFormatter={(label) => `Age Group: ${label}`}
          />
          <Legend />
          <Bar dataKey="count" name="Number of Users" fill="#1e3d59" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <div className="chart-insights">
        <h4>Insights:</h4>
        <p>
          {sortedData.length > 0 ? (
            <>
              The most common age group is {sortedData.reduce((prev, current) => 
                (prev.count > current.count) ? prev : current
              ).ageGroup} with {sortedData.reduce((prev, current) => 
                (prev.count > current.count) ? prev : current
              ).count} users.
            </>
          ) : 'No data available for insights.'}
        </p>
      </div>
    </div>
  );
};

export default AgeDistributionChart;
