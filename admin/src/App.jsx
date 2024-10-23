import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HotelDataTable from './pages/HotelDataTable/HotelDataTable';
import TransportModeDataTable from './pages/TransportModeDataTable/TransportModeDataTable';
import ResturantDataTable from './pages/RasturantDataTable/ResturantDataTable';
import GuideDataTable from './pages/GuidesDataTable/GuideDataTable';
import DestinationsDataTable from './pages/DestinationsDataTable/DestinationsDataTable';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/hotel" element={<HotelDataTable />} />
          <Route path="/transportmode" element={<TransportModeDataTable />} />
          <Route path="/resturant" element={<ResturantDataTable />} />
          <Route path="/guide" element={<GuideDataTable />} />
          <Route path="/destinations" element={<DestinationsDataTable />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
