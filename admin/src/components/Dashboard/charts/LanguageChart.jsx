import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import axios from 'axios';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8A2BE2', '#FF69B4'];

const LanguageChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/guide-analytics/language-distribution')
      .then(res => {
        const formatted = res.data.map(item => ({
          name: item._id,
          value: item.count
        }));
        setData(formatted);
      })
      .catch(error => {
        console.error('Error fetching language distribution data:', error);
        setData([]);
      });
  }, []);

  return (
    <div>
      <h3>Language Proficiency</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} fill="#8884d8" label>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LanguageChart;