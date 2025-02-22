import React from 'react';
import PriceDistribution from './PriceDistribution';
import AvailabilityChart from './AvailabilityChart';
import LocationHeatMap from './LocationHeatMap';
import PopularCategories from './PopularCategories';
import PriceRatingCorrelation from './PriceRatingCorrelation';
import AreaAccommodations from './AreaAccommodations';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <div className="dashboard-grid">
                <PriceDistribution />
                <AvailabilityChart />
                <LocationHeatMap />
                <PopularCategories />
                <PriceRatingCorrelation />
                <AreaAccommodations />
            </div>
        </div>
    );
};

export default Dashboard;
