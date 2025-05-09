import React, { useState, useEffect } from "react";
import { fetchDestinationStats } from "../../services/api";
import CategoryChart from "./charts/CategoryChart";
import DistanceHistogram from "./charts/DistanceHistogram";
import RatingChart from "./charts/RatingChart";
import BestTimeChart from "./charts/BestTimeChart";
import DistanceMap from "./charts/DistanceMap";
import CategoryCount from "./charts/CategoryCount";

const DestinationAnalytics = () => {
  const [stats, setStats] = useState({
    categoryDistribution: [],
    distanceDistribution: [],
    ratingDistribution: [],
    bestTimeDistribution: [],
    categoryCounts: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const data = await fetchDestinationStats();
        setStats(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load destination statistics");
        setLoading(false);
        console.error(err);
      }
    };

    loadStats();
  }, []);

  if (loading) return <div className="text-center p-4">Loading dashboard data...</div>;
  if (error) return <div className="text-center text-red-600 p-4">{error}</div>;

  return (
    <div className="dashboard p-4">
      <h1 className="text-center font-bold text-2xl mb-6">Destination Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <CategoryChart data={stats.categoryDistribution} />
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <DistanceHistogram data={stats.distanceDistribution} />
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <RatingChart data={stats.ratingDistribution} />
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <BestTimeChart data={stats.bestTimeDistribution} />
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <DistanceMap data={stats.distanceDistribution} />
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <CategoryCount data={stats.categoryCounts} />
        </div>
      </div>
    </div>
  );
};

export default DestinationAnalytics;
