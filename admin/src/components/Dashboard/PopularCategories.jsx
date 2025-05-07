import React, { useEffect, useState } from 'react';
import { ResponsivePie } from '@nivo/pie';
import { fetchAnalyticsData } from '../../services/api';

const PopularCategories = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchAnalyticsData.getPopularCategories();
                const dataArray = response.data.data || [];
                
                setData(dataArray.map(item => ({
                    id: item._id,
                    label: item._id,
                    value: item.count
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
            <h3>Popular Categories</h3>
            {data.length > 0 ? (
                <ResponsivePie
                    data={data}
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    activeOuterRadiusOffset={8}
                    colors={{ scheme: 'nivo' }}
                    legends={[
                        {
                            anchor: 'bottom',
                            direction: 'row',
                            translateY: 56,
                            itemWidth: 100,
                            itemHeight: 18,
                            symbolSize: 18,
                            symbolShape: 'circle'
                        }
                    ]}
                />
            ) : (
                <div>Loading data...</div>
            )}
        </div>
    );
};

export default PopularCategories;
