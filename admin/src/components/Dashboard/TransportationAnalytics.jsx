import React, { useEffect, useState } from 'react';
import { getTransportationAnalytics } from '../../services/api';
import VehicleBarChart from './charts/VehicleBarChart';
import VehicleDonutChart from './charts/VehicleDonutChart';

const TransportationAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState({ services: [], categoryCounts: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTransportationAnalytics();
        setAnalyticsData(data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching transportation analytics');
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="transportation-analytics">
      <h2 class="text-center font-bold text-2xl mb-4">Transportation Analytics</h2>

      
      <div className="chart-container">
        <h3>Available Vehicles per Service</h3>
        {analyticsData.services && analyticsData.services.length > 0 ? (
          <VehicleBarChart data={analyticsData.services} />
        ) : (
          <p>No vehicle data available</p>
        )}
      </div>
      
      <div className="chart-container">
        <h3>Vehicle Distribution</h3>
        {analyticsData.services && analyticsData.services.length > 0 ? (
          <VehicleDonutChart data={analyticsData.services} />
        ) : (
          <p>No category data available</p>
        )}
      </div>
    </div>
  );
};

export default TransportationAnalytics;
