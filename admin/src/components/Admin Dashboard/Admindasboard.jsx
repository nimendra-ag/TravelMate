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
      stats: '4 Hotels'
    },
    {
      id: 2,
      title: 'Travel Destination Analysis',
      description: 'Explore popular destinations, booking trends, and seasonal patterns.',
      icon: <FaMapMarkedAlt size={48} />,
      path: '/admin/destination-analytics', 
      stats: '5 Destinations'
    },
    {
      id: 3,
      title: 'Guide Analysis',
      description: 'Monitor guide performance, availability, and customer satisfaction ratings.',
      icon: <FaUserTie size={48} />,
      path: '/admin/guide-analytics', 
      stats: '4 Guides'
    },
    {
      id: 4,
      title: 'User Analysis',
      description: 'Track user registrations, activity patterns, and engagement metrics.',
      icon: <FaUsers size={48} />,
      path: '/admin/user-analysis', 
      stats: '12 Users'
    },
    {
      id: 5,
      title: 'Hotel Booking Analysis',
      description: 'Analyze booking patterns, occupancy rates, and revenue from hotel bookings.',
      icon: <FaCalendarCheck size={48} />,
      path: '/admin/booking-analytics', 
      stats: '3 Bookings'
    },
    {
      id: 6,
      title: 'Transport Modes Analysis',
      description: 'Evaluate preferred transport options, routes, and customer preferences.',
      icon: <FaBus size={48} />,
      path: '/admin/transportation-analytics', 
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

    </div>
  );
};

export default AdminDashboard;
