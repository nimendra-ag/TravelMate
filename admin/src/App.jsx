import { useState } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Guides from './components/Guides/Guides';
import Hotels from './components/Hotels/Hotels';
import Admin from './pages/Admin/Admin';
import AddGuide from './components/AddGuide/AddGuide';
import AddHotel from './components/AddHotel/AddHotel';

function App() {
  const [count, setCount] = useState(0)

  return (
<>
<Sidebar />
      <div style={{ marginLeft: '250px', padding: '20px' }}>
        <Routes>
          <Route path="/guides" element={<Guides/>} />
          <Route path="/hotels" element={<Hotels/>} /> 
          <Route path="/home" element={<Admin/>}/>
          <Route path='add-new-guide' element={<AddGuide/>}/>
          <Route path='add-new-hotel' element={<AddHotel/>}/>
        </Routes>
      </div>
</>

  )
}

export default App
