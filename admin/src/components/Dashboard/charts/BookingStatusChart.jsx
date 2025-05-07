import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const BookingStatusChart = ({ data, loading }) => {
  if (loading) {
    return <div className="chart-loading">Loading booking status data...</div>;
  }
  
  if (!data || data.length === 0) {
    return <div className="chart-no-data">No booking status data available</div>;
  }
  
  // Calculate total bookings and revenue
  const totalBookings = data.reduce((sum, item) => sum + item.count, 0);
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  
  // Format data for the pie chart
  const formattedData = data.map(item => ({
    ...item,
    percentage: ((item.count / totalBookings) * 100).toFixed(1)
  }));
  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{`Status: ${data.status}`}</p>
          <p className="tooltip-value">{`Count: ${data.count} (${data.percentage}%)`}</p>
          <p className="tooltip-value">{`Revenue: $${data.revenue.toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="chart-container status-chart">
      <div className="chart-header">
        <h3>Booking Status Overview</h3>
      </div>
      
      <div className="chart-insights">
        <div className="insight-item">
          <span className="insight-label">Total Bookings:</span>
          <span className="insight-value">{totalBookings}</span>
        </div>
        <div className="insight-item">
          <span className="insight-label">Total Revenue:</span>
          <span className="insight-value">${totalRevenue.toLocaleString()}</span>
        </div>
      </div>
      
      <div className="chart-content">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={formattedData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="count"
              nameKey="status"
              label={({ name, percentage }) => `${name}: ${percentage}%`}
            >
              {formattedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="status-table">
        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>Count</th>
              <th>Percentage</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {formattedData.map((item, index) => (
              <tr key={index}>
                <td>{item.status}</td>
                <td>{item.count}</td>
                <td>{item.percentage}%</td>
                <td>${item.revenue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingStatusChart;
