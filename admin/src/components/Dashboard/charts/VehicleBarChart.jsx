import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const VehicleBarChart = ({ data }) => {
  // Check if data is an array and not empty
  if (!Array.isArray(data) || data.length === 0) {
    return <div>No data available for chart</div>;
  }

  const chartData = data.map(item => ({
    name: item.transportationServiceName || 'Unknown',
    count: item.availableVehicles || 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default VehicleBarChart;
