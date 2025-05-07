import React, { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { fetchAnalyticsData } from '../../services/api';

const AreaAccommodations = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchAnalyticsData.getAreaAccommodations();
                const dataArray = response.data.data || [];
                setData(dataArray.map(item => ({
                    area: item._id,
                    count: item.count
                })));
            } catch (error) {
                console.log('Error fetching data:', error);
                setData([]);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ height: '300px' }}>
            <h3>Accommodations by Area</h3>
            <ResponsiveBar
                data={data}
                keys={['count']}
                indexBy="area"
                margin={{ top: 50, right: 30, bottom: 50, left: 60 }}
                padding={0.3}
                colors={{ scheme: 'nivo' }}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 45,
                    legend: 'Distance from City',
                    legendPosition: 'middle',
                    legendOffset: 40
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Number of Accommodations',
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
            />
        </div>
    );
};

export default AreaAccommodations;
