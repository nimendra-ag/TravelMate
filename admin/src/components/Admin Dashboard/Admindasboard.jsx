import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHotel, FaMapMarkedAlt, FaUserTie, FaUsers, FaCalendarCheck, FaBus } from 'react-icons/fa';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const dashboardCards = [
    {
      id: 1,
      title: 'Hotel Analysis',
      description: 'View detailed analytics about hotel ratings and performance metrics.',
      icon: <FaHotel size={48} />,
      path: '/admin/dashboard', 
      stats: '124 Hotels'
    },
    {
      id: 2,
      title: 'Travel Destination Analysis',
      description: 'Explore popular destinations, booking trends, and seasonal patterns.',
      icon: <FaMapMarkedAlt size={48} />,
      path: '/admin/destination-analysis', 
      stats: '86 Destinations'
    },
    {
      id: 3,
      title: 'Guide Analysis',
      description: 'Monitor guide performance, availability, and customer satisfaction ratings.',
      icon: <FaUserTie size={48} />,
      path: '/admin/guide-analysis', 
      stats: '52 Guides'
    },
    {
      id: 4,
      title: 'User Analysis',
      description: 'Track user registrations, activity patterns, and engagement metrics.',
      icon: <FaUsers size={48} />,
      path: '/admin/user-analysis', 
      stats: '1,248 Users'
    },
    {
      id: 5,
      title: 'Hotel Booking Analysis',
      description: 'Analyze booking patterns, occupancy rates, and revenue from hotel bookings.',
      icon: <FaCalendarCheck size={48} />,
      path: '/admin/hotel-booking-analysis', 
      stats: '2,845 Bookings'
    },
    {
      id: 6,
      title: 'Transport Modes Analysis',
      description: 'Evaluate preferred transport options, routes, and customer preferences.',
      icon: <FaBus size={48} />,
      path: '/admin/transport-analysis', 
      stats: '6 Transport Types'
    }
  ];

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Travelmate Admin Dashboard</h1>
        <p>Welcome back! Here's an overview of your travel platform.</p>
      </div>

      <div className="dashboard-cards">
        {dashboardCards.map((card) => (
          <div 
            key={card.id} 
            className="dashboard-card"
            onClick={() => handleCardClick(card.path)}
          >
            <div className="card-icon">{card.icon}</div>
            <div className="card-content">
              <h2>{card.title}</h2>
              <p>{card.description}</p>
              <div className="card-stats">{card.stats}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-summary">
        <h2>Platform Overview</h2>
        <div className="summary-stats">
          <div className="stat-item">
            <h3>Total Bookings</h3>
            <p className="stat-value">3,542</p>
            <p className="stat-change positive">+12% from last month</p>
          </div>
          <div className="stat-item">
            <h3>Revenue</h3>
            <p className="stat-value">$124,850</p>
            <p className="stat-change positive">+8% from last month</p>
          </div>
          <div className="stat-item">
            <h3>Active Users</h3>
            <p className="stat-value">856</p>
            <p className="stat-change positive">+5% from last month</p>
          </div>
          <div className="stat-item">
            <h3>Customer Satisfaction</h3>
            <p className="stat-value">4.7/5</p>
            <p className="stat-change positive">+0.2 from last month</p>
          </div>
          <div className="stat-item">
            <h3>Hotel Occupancy</h3>
            <p className="stat-value">78%</p>
            <p className="stat-change positive">+3% from last month</p>
          </div>
          <div className="stat-item">
            <h3>Transport Bookings</h3>
            <p className="stat-value">1,256</p>
            <p className="stat-change positive">+15% from last month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
