import React from 'react';

const DistanceMap = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>Loading distance map data...</div>;
  }

  const svgWidth = 600;
  const svgHeight = 600;
  const centerX = svgWidth / 2;
  const centerY = svgHeight / 2;
  const maxRadius = Math.min(centerX, centerY) - 50;

  const distanceRanges = [
    { max: 50, radius: maxRadius * 0.2, color: '#8884d8' },
    { max: 100, radius: maxRadius * 0.4, color: '#82ca9d' },
    { max: 150, radius: maxRadius * 0.6, color: '#ffc658' },
    { max: 200, radius: maxRadius * 0.8, color: '#ff8042' },
    { max: 500, radius: maxRadius, color: '#0088FE' }
  ];

  const rangeGroups = {};
  data.forEach(range => {
    rangeGroups[range.range] = range.count;
  });

  return (
    <div className="chart-container flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-4">Distance-based Map from Colombo</h2>

      <div className="flex justify-center items-center h-[400px]">
        <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
          {/* Circles */}
          {distanceRanges.map((range, i) => (
            <circle
              key={`circle-${i}`}
              cx={centerX}
              cy={centerY}
              r={range.radius}
              fill="none"
              stroke={range.color}
              strokeWidth="2"
              strokeDasharray={i === distanceRanges.length - 1 ? "none" : "5,5"}
            />
          ))}

          {/* Colombo center */}
          <circle cx={centerX} cy={centerY} r="8" fill="#FF0000" />
          <text x={centerX} y={centerY - 15} textAnchor="middle" fill="#000">Colombo</text>

          {/* Distance labels */}
          {distanceRanges.map((range, i) => (
            <text
              key={`text-${i}`}
              x={centerX}
              y={centerY - range.radius - 5}
              textAnchor="middle"
              fill={range.color}
              fontWeight="bold"
            >
              {range.max} km
            </text>
          ))}

          {/* Legend */}
          <g transform={`translate(${svgWidth - 150}, 50)`}>
            <text x="0" y="0" fontWeight="bold">Distance Ranges</text>
            {Object.entries(rangeGroups).map(([range, count], i) => (
              <g key={`legend-${i}`} transform={`translate(0, ${20 + i * 20})`}>
                <rect width="15" height="15" fill={distanceRanges[i]?.color || '#ccc'} />
                <text x="20" y="12">{range} km: {count}</text>
              </g>
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
};

export default DistanceMap;
