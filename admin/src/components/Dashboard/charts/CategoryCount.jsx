import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CategoryCount = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>Loading category count data...</div>;
  }

  return (
    <div className="chart-container">
      <h2>Destinations by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="category" type="category" width={120} />
          <Tooltip formatter={(value) => [`${value} destinations`, 'Count']} />
          <Legend />
          <Bar dataKey="count" name="Destinations" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryCount;