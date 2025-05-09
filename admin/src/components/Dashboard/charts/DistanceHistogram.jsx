import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DistanceHistogram = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>Loading distance data...</div>;
  }

  return (
    <div className="chart-container">
      <h2>Distance Distribution from Colombo</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" label={{ value: 'Distance (km)', position: 'insideBottom', offset: -5 }} />
          <YAxis label={{ value: 'Number of Destinations', angle: -90, position: 'insideLeft' }} />
          <Tooltip 
            formatter={(value, name, props) => [`${value} destinations`, 'Count']}
            labelFormatter={(label) => `${label} km`}
          />
          <Legend />
          <Bar dataKey="count" name="Destinations" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DistanceHistogram;