import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import { fetchAnalyticsData } from '../../services/api';
import 'leaflet/dist/leaflet.css';

const LocationHeatMap = () => {
    const [locations, setLocations] = useState([]);
    const center = [7.8731, 80.7718]; // Sri Lanka center coordinates

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchAnalyticsData.getLocationData();
                const locationData = response.data.data || [];
                
                // Transform the data to ensure valid coordinates
                const validLocations = locationData.filter(location => {
                    const lat = parseFloat(location.distance_from_city.split(',')[0]);
                    const lng = parseFloat(location.distance_from_city.split(',')[1]);
                    return !isNaN(lat) && !isNaN(lng);
                }).map(location => ({
                    lat: parseFloat(location.distance_from_city.split(',')[0]),
                    lng: parseFloat(location.distance_from_city.split(',')[1]),
                    count: location.count || 1
                }));

                setLocations(validLocations);
            } catch (error) {
                console.log('Data fetch error:', error);
                setLocations([]);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ height: '400px' }}>
            <h3>Location Distribution</h3>
            <MapContainer center={center} zoom={8} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {Array.isArray(locations) && locations.map((location, index) => (
                    location.lat && location.lng && (
                        <Circle
                            key={index}
                            center={[location.lat, location.lng]}
                            radius={location.count * 1000}
                            fillColor="red"
                            color="red"
                            fillOpacity={0.5}
                        />
                    )
                ))}
            </MapContainer>
        </div>
    );
};

export default LocationHeatMap;
