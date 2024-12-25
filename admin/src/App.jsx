import Sidebar from './components/Sidebar/Sidebar'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Guides from './components/Guides/Guides';
import Hotels from './components/Hotels/Hotels';
import Admin from './pages/Admin/Admin';
import AddGuide from './components/AddGuide/AddGuide';
import AddHotel from './components/AddHotel/AddHotel';
import AddTransportationService from './components/AddTransportationService/AddTransportationService';
import AddRestaurant from './components/AddRestaurant/AddRestaurant';
import AddDestination from './components/AddDestination/AddDestination';
import HotelDataTable from './pages/HotelDataTable/HotelDataTable';
import TransportModeDataTable from './pages/TransportModeDataTable/TransportModeDataTable';
import ResturantDataTable from './pages/RasturantDataTable/ResturantDataTable';
import GuideDataTable from './pages/GuidesDataTable/GuideDataTable';
import DestinationsDataTable from './pages/DestinationsDataTable/DestinationsDataTable';
import TranspotationServices from './components/TranspotationServices/TranspotationServices';
import Restaurants from './components/Restaurants/Restaurants';
import AddPrePlannedTrips from './components/AddPrePlannedTrips/AddPrePlannedTrips';


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
            <Route path='/add-new-guide' element={<AddGuide />} />
            <Route path='/add-restaurant' element={<AddRestaurant />} />
            <Route path='/add-destination' element={<AddDestination />} />
            <Route path='/add-new-hotel' element={<AddHotel />} />
            <Route path='/add-transportation-service' element={<AddTransportationService />} />
            <Route path='/add-pre-planned-trips' element={<AddPrePlannedTrips />} />
            <Route path="/hotel-data-table" element={<HotelDataTable />} />
            <Route path="/transport-mode-data-table" element={<TransportModeDataTable />} />
            <Route path="/resturant-data-table" element={<ResturantDataTable />} />
            <Route path="/guide-data-table" element={<GuideDataTable />} />
            <Route path="/destinations-data-table" element={<DestinationsDataTable />} />
            <Route path='/transportmodes' element={<TranspotationServices/>}/>
            <Route path='/restaurants' element={<Restaurants/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </>

  )
   
}

export default App;
