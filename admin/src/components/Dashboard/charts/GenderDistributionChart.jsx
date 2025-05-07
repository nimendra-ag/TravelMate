import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#1e3d59', '#f5f0e1', '#ff6e40', '#ffc13b'];

const GenderDistributionChart = ({ data, loading }) => {
  if (loading) {
    return <div className="chart-loading">Loading gender distribution data...</div>;
  }

  if (!data || data.length === 0) {
    return <div className="chart-no-data">No gender distribution data available</div>;
  }

  // Calculate total for percentage
  const total = data.reduce((sum, item) => sum + item.count, 0);

  // Custom tooltip to show percentage
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const percentage = ((payload[0].value / total) * 100).toFixed(1);
      return (
        <div className="custom-tooltip">
          <p className="label">{`${payload[0].name}: ${payload[0].value} users`}</p>
          <p className="percentage">{`${percentage}% of total users`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container">
      <h3>User Gender Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="count"
            nameKey="gender"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <div className="chart-insights">
        <h4>Insights:</h4>
        <p>
          {data.length > 0 ? (
            <>
              The platform has {data.map(item => `${item.count} ${item.gender}`).join(', ')} users.
              {data.length > 1 && ` The dominant gender is ${
                data.reduce((prev, current) => (prev.count > current.count) ? prev : current).gender
              } at ${((data.reduce((prev, current) => 
                (prev.count > current.count) ? prev : current
              ).count / total) * 100).toFixed(1)}%.`}
            </>
          ) : 'No data available for insights.'}
        </p>
      </div>
    </div>
  );
};

export default GenderDistributionChart;
