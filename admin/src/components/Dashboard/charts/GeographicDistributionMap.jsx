import React, { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  ZoomableGroup
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

// Updated topojson URL - this is a reliable source for world map data
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const GeographicDistributionMap = ({ data, loading }) => {
  const [tooltipContent, setTooltipContent] = useState("");
  
  if (loading) {
    return <div className="chart-loading">Loading geographic distribution data...</div>;
  }
  
  if (!data || data.length === 0) {
    return <div className="chart-no-data">No geographic distribution data available</div>;
  }
  
  // Create a map for quick lookup
  const countryData = {};
  data.forEach(item => {
    countryData[item.country] = item.count;
  });
  
  // Find max value for color scale
  const maxValue = Math.max(...data.map(d => d.count));
  
  // Create color scale
  const colorScale = scaleLinear()
    .domain([0, maxValue])
    .range(["#e6f2ff", "#1e3d59"]);
  
  return (
    <div className="chart-container map-container">
      <h3>User Geographic Distribution</h3>
      
      <ReactTooltip 
        id="geo-tooltip"
        content={tooltipContent}
      />
      
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 147
        }}
        width={800}
        height={400}
        style={{ width: "100%", height: "auto" }}
      >
        <ZoomableGroup zoom={1}>
          <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
          <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => {
                // The property name might be different in this topojson
                const countryName = geo.properties.name || geo.properties.NAME;
                const userCount = countryData[countryName] || 0;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={userCount > 0 ? colorScale(userCount) : "#F5F4F6"}
                    stroke="#D6D6DA"
                    strokeWidth={0.5}
                    data-tooltip-id="geo-tooltip"
                    onMouseEnter={() => {
                      setTooltipContent(
                        `${countryName}: ${userCount} users`
                      );
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    style={{
                      default: {
                        outline: "none"
                      },
                      hover: {
                        fill: "#ff6e40",
                        outline: "none"
                      },
                      pressed: {
                        outline: "none"
                      }
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      <div className="chart-insights">
        <h4>Insights:</h4>
        <p>
          {data.length > 0 ? (
            <>
              Users are spread across {data.length} countries. 
              The country with the most users is {
                data.reduce((prev, current) => (prev.count > current.count) ? prev : current).country
              } with {
                data.reduce((prev, current) => (prev.count > current.count) ? prev : current).count
              } users.
            </>
          ) : 'No data available for insights.'}
        </p>
      </div>
    </div>
  );
};

export default GeographicDistributionMap;
