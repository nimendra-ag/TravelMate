import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { fetchAnalyticsData } from '../../services/api';

const AvailabilityChart = () => {
    const [data, setData] = useState([]);
    const COLORS = ['#0088FE', '#FF8042'];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchAnalyticsData.getAvailabilityStatus();
                const dataArray = response.data.data || [];
                
                setData(dataArray.map(item => ({
                    name: item._id ? 'Available' : 'Not Available',
                    value: item.count
                })));
            } catch (error) {
                console.log('Data fetch error:', error);
                setData([]);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ height: '300px' }}>
            <h3>Availability Status</h3>
            {data.length > 0 ? (
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            ) : (
                <div>Loading data...</div>
            )}
        </div>
    );
};

export default AvailabilityChart;
