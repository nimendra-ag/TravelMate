import React, { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { fetchAnalyticsData } from '../../services/api';

const PriceDistribution = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchAnalyticsData.getPriceDistribution();
                const dataArray = response.data.data || [];
                
                setData(dataArray.map(item => ({
                    range: item._id,
                    count: item.count
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
            <h3>Price Distribution</h3>
            {data.length > 0 ? (
                <ResponsiveBar
                    data={data}
                    keys={['count']}
                    indexBy="range"
                    margin={{ top: 50, right: 30, bottom: 50, left: 60 }}
                    padding={0.3}
                    colors={{ scheme: 'nivo' }}
                    axisBottom={{
                        tickSize: 5,
                        tickRotation: 0,
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickRotation: 0,
                    }}
                />
            ) : (
                <div>Loading data...</div>
            )}
        </div>
    );
};

export default PriceDistribution;
