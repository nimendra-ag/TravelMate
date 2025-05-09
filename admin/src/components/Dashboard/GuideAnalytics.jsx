import React from 'react';
import AreaChart from './charts/AreaChart';
import LanguageChart from './charts/LanguageChart';
import AgeChart from './charts/AgeChart';
import RatingChart from './charts/RatingChart';

const GuideAnalytics = () => {
  return (
    <div className="container">
      <h2 className="mb-4 text-center font-bold text-xl">Guide Analytics</h2>
      <div className="mb-5"><AreaChart /></div>
      <div className="mb-5"><LanguageChart /></div>
      <div className="mb-5"><AgeChart /></div>
      <div className="mb-5"><RatingChart /></div>
    </div>
  );
};

export default GuideAnalytics;
