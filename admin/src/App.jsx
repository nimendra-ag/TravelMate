import { useState } from 'react'
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

function App() {
  const [count, setCount] = useState(0)

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
            <Route path='/add-new-hotel' element={<AddHotel />} />
            <Route path='/add-transportation-service' element={<AddTransportationService />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>

  )
}

export default App
