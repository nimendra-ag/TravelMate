import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import axios from 'axios';

const RatingChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/guide-analytics/rating-distribution')
      .then(res => {
        const formatted = res.data.map(item => ({
          name: item._id.toString(),
          value: item.count
        }));
        setData(formatted);
      });
  }, []);

  return (
    <div>
      <h3>Guide Ratings</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" label={{ value: "Rating", position: "insideBottom", offset: -5 }} />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#ff7300" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RatingChart;
