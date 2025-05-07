import React, { useState, useEffect } from 'react';
import { 
  fetchAgeDistribution, 
  fetchGenderDistribution, 
  fetchGeographicDistribution, 
  fetchTopCountries, 
  fetchUserRegistrationTrends 
} from '../../services/userAnalyticsService';
import AgeDistributionChart from './charts/AgeDistributionChart';
import GenderDistributionChart from './charts/GenderDistributionChart';
import GeographicDistributionMap from './charts/GeographicDistributionMap';
import TopCountriesChart from './charts/TopCountriesChart';
import UserRegistrationTrendsChart from './charts/UserRegistrationTrendsChart';
import './UserAnalytics.css';

const UserAnalytics = () => {
  // State for each chart data
  const [ageData, setAgeData] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [geoData, setGeoData] = useState([]);
  const [topCountriesData, setTopCountriesData] = useState([]);
  const [registrationData, setRegistrationData] = useState([]);
  
  // Loading states
  const [ageLoading, setAgeLoading] = useState(true);
  const [genderLoading, setGenderLoading] = useState(true);
  const [geoLoading, setGeoLoading] = useState(true);
  const [topCountriesLoading, setTopCountriesLoading] = useState(true);
  const [registrationLoading, setRegistrationLoading] = useState(true);
  
  // Current period for registration trends
  const [registrationPeriod, setRegistrationPeriod] = useState('monthly');

  // Summary stats
  const [totalUsers, setTotalUsers] = useState(0);
  
  // Fetch age distribution data
  useEffect(() => {
    const getAgeData = async () => {
      try {
        setAgeLoading(true);
        const data = await fetchAgeDistribution();
        setAgeData(data);
      } catch (error) {
        console.error('Failed to fetch age distribution:', error);
      } finally {
        setAgeLoading(false);
      }
    };
    
    getAgeData();
  }, []);
  
  // Fetch gender distribution data
  useEffect(() => {
    const getGenderData = async () => {
      try {
        setGenderLoading(true);
        const data = await fetchGenderDistribution();
        setGenderData(data);
        
        // Calculate total users from gender data
        const total = data.reduce((sum, item) => sum + item.count, 0);
        setTotalUsers(total);
      } catch (error) {
        console.error('Failed to fetch gender distribution:', error);
      } finally {
        setGenderLoading(false);
      }
    };
    
    getGenderData();
  }, []);
  
  // Fetch geographic distribution data
  useEffect(() => {
    const getGeoData = async () => {
      try {
        setGeoLoading(true);
        const data = await fetchGeographicDistribution();
        setGeoData(data);
      } catch (error) {
        console.error('Failed to fetch geographic distribution:', error);
      } finally {
        setGeoLoading(false);
      }
    };
    
    getGeoData();
  }, []);
  
  // Fetch top countries data
  useEffect(() => {
    const getTopCountriesData = async () => {
      try {
        setTopCountriesLoading(true);
        const data = await fetchTopCountries();
        setTopCountriesData(data);
      } catch (error) {
        console.error('Failed to fetch top countries:', error);
      } finally {
        setTopCountriesLoading(false);
      }
    };
    
    getTopCountriesData();
  }, []);
  
  // Fetch registration trends data
  useEffect(() => {
    const getRegistrationData = async () => {
      try {
        setRegistrationLoading(true);
        const data = await fetchUserRegistrationTrends(registrationPeriod);
        setRegistrationData(data);
      } catch (error) {
        console.error('Failed to fetch registration trends:', error);
      } finally {
        setRegistrationLoading(false);
      }
    };
    
    getRegistrationData();
  }, [registrationPeriod]);
  
  // Handle period change for registration trends
  const handlePeriodChange = (period) => {
    setRegistrationPeriod(period);
  };
  
  // Calculate new users in the last 30 days
  const getNewUsersLastMonth = () => {
    if (registrationData.length === 0) return 0;
    
    const last30Days = registrationData
      .filter(item => {
        const date = new Date(item.date);
        const now = new Date();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(now.getDate() - 30);
        return date >= thirtyDaysAgo;
      })
      .reduce((sum, item) => sum + item.count, 0);
      
    return last30Days;
  };

  return (
    <div className="user-analytics-container">
      <div className="analytics-header">
        <h1>User Analysis Dashboard</h1>
        <p>Comprehensive insights into user demographics and registration patterns</p>
      </div>
      
      <div className="analytics-summary">
        <div className="summary-card">
          <h3>Total Users</h3>
          <p className="summary-value">{totalUsers}</p>
        </div>
        <div className="summary-card">
          <h3>New Users (Last 30 Days)</h3>
          <p className="summary-value">{getNewUsersLastMonth()}</p>
        </div>
        <div className="summary-card">
          <h3>Countries Represented</h3>
          <p className="summary-value">{geoData.length}</p>
        </div>
        <div className="summary-card">
          <h3>Gender Ratio</h3>
          <p className="summary-value">
            {genderData.length > 1 ? 
              `${genderData[0]?.gender}: ${genderData[1]?.gender} = ${(genderData[0]?.count / genderData[1]?.count).toFixed(1)}:1` : 
              'N/A'}
          </p>
        </div>
      </div>
      
      <div className="analytics-grid">
        <div className="chart-wrapper">
          <UserRegistrationTrendsChart 
            data={registrationData} 
            loading={registrationLoading} 
            onPeriodChange={handlePeriodChange}
          />
        </div>
        
        <div className="chart-wrapper">
          <AgeDistributionChart data={ageData} loading={ageLoading} />
        </div>
        
        <div className="chart-wrapper">
          <GenderDistributionChart data={genderData} loading={genderLoading} />
        </div>
        
        <div className="chart-wrapper full-width">
          <GeographicDistributionMap data={geoData} loading={geoLoading} />
        </div>
        
        <div className="chart-wrapper">
          <TopCountriesChart data={topCountriesData} loading={topCountriesLoading} />
        </div>
      </div>
    </div>
  );
};

export default UserAnalytics;
