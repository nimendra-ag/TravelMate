import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const VehicleDonutChart = ({ data }) => {
  // Check if data is an array and not empty
  if (!Array.isArray(data) || data.length === 0) {
    return <div>No data available for chart</div>;
  }

  const categoryData = data.map((item) => ({
    name: item.transportationServiceName || 'Unknown',
    value: item.availableVehicles || 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={categoryData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          innerRadius={40}
          fill="#8884d8"
          label
        >
          {categoryData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default VehicleDonutChart;
