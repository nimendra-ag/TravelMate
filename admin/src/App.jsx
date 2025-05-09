import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Auth Components
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import LandingPage from './components/LandingPage/LandingPage';
import { AuthProvider, AuthContext } from './context/AuthContext';

// Layout Components
import TopNavbar from './components/TopNavbar/TopNavbar';
import Sidebar from './components/Sidebar/Sidebar';

// Pages
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
import ViewHotel from './components/ViewHotel/ViewHotel';
import ViewGuide from './components/ViewGuide/ViewGuide';
import ViewDestination from './components/ViewDestination/ViewDestination';
import ViewRestaurant from './components/ViewRestaurant/ViewRestaurant';
import ViewTransportationService from './components/ViewTransportationServices/ViewTransportationServices';
import AddHospital from './components/AddHospital/AddHospital';
import ManageRooms from './components/ViewHotel/ManageRooms';
import AddRoom from './components/ViewHotel/AddNewRoom';
import HotelBookings from './pages/HotelBookings/HotelBookings';
import GuideBookingsAdmin from './pages/GuideBooking/GuideBookingsAdmin';
import ManageVehicals from './components/ViewTransportationServices/ManageVehicals';
import AddVehicle from './components/ViewTransportationServices/AddVehical';
import TransportBookingsAdmin from './pages/TransportBooking/TransportBookingAdmin';
import PaymentDetailsForm from './components/CardPaymentDetailsForm/PaymentDetailsForm';
import Dashboard from './components/Dashboard/Dashboard';
import AdminDashboard from './components/Admin Dashboard/Admindasboard';
import BookingAnalytics from './components/Dashboard/BookingAnalytics';
import UserAnalytics from './components/Dashboard/UserAnalytics';
import GuideAnalytics from './components/Dashboard/GuideAnalytics';
import DestinationAnalytics from './components/Dashboard/DestinationAnalytics';
import TransportationAnalytics from './components/Dashboard/TransportationAnalytics';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useContext(AuthContext);
  
  // If still loading auth state, show nothing or a loading spinner
  if (loading) {
    return <div className="d-flex justify-content-center my-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>;
  }
  
  // If not authenticated, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  // If authenticated, render the child components
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected routes with layout */}
          <Route path="*" element={
            <ProtectedRoute>
              <div>
                <TopNavbar />
                <Sidebar />
                <div style={{ marginLeft: '250px', marginTop: '80px', padding: '20px' }}>
                  <Routes>
                    <Route path="/guides" element={<Guides />} />
                    <Route path="/hotels" element={<Hotels />} />
                    <Route path="/destinations" element={<DestinationsDataTable />} />
                    <Route path="/home" element={<Admin />} />
                    <Route path='/add-new-guide' element={<AddGuide />} />
                    <Route path='/add-restaurant' element={<AddRestaurant />} />
                    <Route path='/add-destination' element={<AddDestination />} />
                    <Route path='/add-new-hotel' element={<AddHotel />} />
                    <Route path='/add-transportation-service' element={<AddTransportationService />} />
                    <Route path='/add-pre-planned-trips' element={<AddPrePlannedTrips />} />
                    <Route path='/add-hospital' element={<AddHospital />} />
                    <Route path="/hotel-data-table" element={<HotelDataTable />} />
                    <Route path="/transport-mode-data-table" element={<TransportModeDataTable />} />
                    <Route path="/resturant-data-table" element={<ResturantDataTable />} />
                    <Route path="/guide-data-table" element={<GuideDataTable />} />
                    <Route path="/destinations-data-table" element={<DestinationsDataTable />} />
                    <Route path='/transportmodes' element={<TranspotationServices/>}/>
                    <Route path='/restaurants' element={<Restaurants/>}/>
                    <Route path="/view-hotel/:id" element={<ViewHotel />} />
                    <Route path="/view-guide/:id" element={<ViewGuide />} />
                    <Route path="/view-destination/:id" element={<ViewDestination />} />
                    <Route path="/view-restaurant/:id" element={<ViewRestaurant />} />
                    <Route path="/view-transportation-service/:id" element={<ViewTransportationService />} />
                    <Route path="/manage-rooms" element={<ManageRooms/>} />
                    <Route path="/add-room" element={<AddRoom/>} />
                    <Route path="/manage-hotel-bookings" element={<HotelBookings/>} />
                    <Route path="/manage-guide-bookings" element={<GuideBookingsAdmin/>} />
                    <Route path="/manage-vehicals/:id" element={<ManageVehicals/>} />
                    <Route path="/add-vehical" element={<AddVehicle/>} />
                    <Route path="/manage-transport-bookings" element={<TransportBookingsAdmin/>} />
                    <Route path="/payment-details" element={<PaymentDetailsForm />} />
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                    <Route path="/admin-pannel" element={<AdminDashboard />} />
                    <Route path="/admin/booking-analytics" element={<BookingAnalytics />} />
                    <Route path="/admin/user-analysis" element={<UserAnalytics />} />
                    <Route path="/admin/guide-analytics" element={<GuideAnalytics />} />
                    <Route path="/admin/destination-analytics" element={<DestinationAnalytics />} />
                    <Route path="/admin/transportation-analytics" element={<TransportationAnalytics />} />
                  </Routes>
                </div>
              </div>
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;