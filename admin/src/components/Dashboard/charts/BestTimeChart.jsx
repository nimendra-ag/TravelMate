import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BestTimeChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>Loading best time data...</div>;
  }

  return (
    <div className="chart-container">
      <h2>Best Time to Visit Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis label={{ value: 'Number of Destinations', angle: -90, position: 'insideLeft' }} />
          <Tooltip formatter={(value) => [`${value} destinations`, 'Count']} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="count" 
            name="Destinations" 
            stroke="#FF8042" 
            activeDot={{ r: 8 }} 
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BestTimeChart;
