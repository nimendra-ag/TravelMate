import { useState } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Guides from './components/Guides/Guides';
import Hotels from './components/Hotels/Hotels';
import Admin from './pages/Admin/Admin';
import AddGuide from './components/AddGuide/AddGuide';
import AddHotel from './components/AddHotel/AddHotel';
import HotelDataTable from './pages/HotelDataTable/HotelDataTable';
import TransportModeDataTable from './pages/TransportModeDataTable/TransportModeDataTable';
import ResturantDataTable from './pages/RasturantDataTable/ResturantDataTable';
import GuideDataTable from './pages/GuidesDataTable/GuideDataTable';
import DestinationsDataTable from './pages/DestinationsDataTable/DestinationsDataTable';



const App = () => {
  
  return (
    <>
      <BrowserRouter>
        <Sidebar />
        <div style={{ marginLeft: '250px', padding: '20px' }}>
          <Routes>
            <Route path="/guides" element={<Guides />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/home" element={<Admin />} />
            <Route path='add-new-guide' element={<AddGuide />} />
            <Route path='add-new-hotel' element={<AddHotel />} />
            <Route path="/hotel" element={<HotelDataTable />} />
            <Route path="/transportmode" element={<TransportModeDataTable />} />
            <Route path="/resturant" element={<ResturantDataTable />} />
            <Route path="/guide" element={<GuideDataTable />} />
            <Route path="/destinations" element={<DestinationsDataTable />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>

  )
   
}

export default App;
