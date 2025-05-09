import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const AreaChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/guide-analytics/area-distribution')
      .then(res => {
        const formatted = res.data.map(item => ({ name: item._id, value: item.count }));
        setData(formatted);
      });
  }, []);

  return (
    <div>
    <h3>Area Distribution</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
};

export default AreaChart;
