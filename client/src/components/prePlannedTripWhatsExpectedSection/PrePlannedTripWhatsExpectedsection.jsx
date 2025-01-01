import React from "react";
import PrePlannedTripWhatsExpectedCard from '../prePlannedTripWhatsExpectedCard/PrePlannedTripWhatsExpectedCard';

const PrePlannedTripWhatsExpectedsection = () => {
  // Example data
  const images = [
   "https://picsum.photos/300/500?random=1",
    "https://picsum.photos/300/500?random=2",
    "https://picsum.photos/300/500?random=3",
  ];

  const mainActivities = ["Hiking in Ella", "Camping in Horton Plains", "Sightseeing"];

  return (
    <div className="main-container">
      <div style={{ display: "flex", justifyContent: "center", marginTop: "50px", width: "100%" }}>
        <div style={{ flex: 1.2, padding: "0 20px" }}>
          <h2>What's Expected</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div style={{ flex: 0.8, display: "flex", justifyContent: "center" }}>
          <PrePlannedTripWhatsExpectedCard images={images} mainActivities={mainActivities} />
        </div>
      </div>
    </div>
  );
};

export default PrePlannedTripWhatsExpectedsection;
