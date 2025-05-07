import React, { useEffect, useState } from 'react';
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import { fetchAnalyticsData } from '../../services/api';

const PriceRatingCorrelation = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchAnalyticsData.getPriceRatingData();
                const dataArray = response.data.data || [];
                
                setData([{
                    id: 'Price vs Rating',
                    data: dataArray.map(item => ({
                        x: item.perPerson_price,
                        y: item.rating
                    }))
                }]);
            } catch (error) {
                console.log('Data fetch error:', error);
                setData([]);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ height: '300px' }}>
            <h3>Price-Rating Correlation</h3>
            {data.length > 0 ? (
                <ResponsiveScatterPlot
                    data={data}
                    margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
                    xScale={{ type: 'linear', min: 0, max: 'auto' }}
                    yScale={{ type: 'linear', min: 0, max: 5 }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Price',
                        legendPosition: 'middle',
                        legendOffset: 46
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Rating',
                        legendPosition: 'middle',
                        legendOffset: -60
                    }}
                />
            ) : (
                <div>Loading data...</div>
            )}
        </div>
    );
};

export default PriceRatingCorrelation;
