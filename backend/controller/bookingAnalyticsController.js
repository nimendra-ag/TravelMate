import { BookingsModel } from '../models/Bookings.js';
import moment from 'moment';

// Get seasonal booking patterns
export const getSeasonalBookingPatterns = async (req, res) => {
  try {
    const { year = new Date().getFullYear() } = req.query;
    
    // Aggregate bookings by month
    const seasonalData = await BookingsModel.aggregate([
      {
        $match: {
          from: { 
            $regex: year.toString() 
          }
        }
      },
      {
        $group: {
          _id: { $substr: ['$from', 5, 2] }, // Extract month (MM) from date string
          bookingCount: { $sum: 1 },
          revenue: { $sum: '$totalprice' },
          avgDuration: { $avg: '$totaldays' }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // Format the data for frontend
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const formattedData = months.map((month, index) => {
      const monthNum = String(index + 1).padStart(2, '0');
      const monthData = seasonalData.find(item => item._id === monthNum) || {
        bookingCount: 0,
        revenue: 0,
        avgDuration: 0
      };
      
      return {
        month,
        bookingCount: monthData.bookingCount,
        revenue: monthData.revenue,
        avgDuration: monthData.avgDuration ? parseFloat(monthData.avgDuration.toFixed(1)) : 0
      };
    });

    res.json(formattedData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching seasonal booking patterns', error: error.message });
  }
};

// Get booking status overview
export const getBookingStatusOverview = async (req, res) => {
  try {
    const statusData = await BookingsModel.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          revenue: { $sum: '$totalprice' }
        }
      }
    ]);

    const formattedData = statusData.map(item => ({
      status: item._id,
      count: item.count,
      revenue: item.revenue
    }));

    res.json(formattedData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booking status overview', error: error.message });
  }
};

// Get daily booking activity
export const getDailyBookingActivity = async (req, res) => {
  try {
    // Get bookings by day of week
    const dayOfWeekData = await BookingsModel.aggregate([
      {
        $addFields: {
          dateObj: { $toDate: '$date' }
        }
      },
      {
        $group: {
          _id: { $dayOfWeek: '$dateObj' }, // 1 for Sunday, 2 for Monday, etc.
          bookingCount: { $sum: 1 },
          revenue: { $sum: '$totalprice' }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // Get bookings by hour of day
    const hourlyData = await BookingsModel.aggregate([
      {
        $addFields: {
          dateObj: { $toDate: '$date' }
        }
      },
      {
        $group: {
          _id: { $hour: '$dateObj' },
          bookingCount: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // Format day of week data
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const formattedDayData = daysOfWeek.map((day, index) => {
      const dayData = dayOfWeekData.find(item => item._id === index + 1) || {
        bookingCount: 0,
        revenue: 0
      };
      
      return {
        day,
        bookingCount: dayData.bookingCount,
        revenue: dayData.revenue
      };
    });

    // Format hourly data
    const formattedHourlyData = Array.from({ length: 24 }, (_, i) => {
      const hour = i;
      const hourData = hourlyData.find(item => item._id === hour) || {
        bookingCount: 0
      };
      
      return {
        hour: `${hour}:00`,
        bookingCount: hourData.bookingCount
      };
    });

    res.json({
      dayOfWeek: formattedDayData,
      hourly: formattedHourlyData
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching daily booking activity', error: error.message });
  }
};

// Get all booking analytics in one call
export const getAllBookingAnalytics = async (req, res) => {
  try {
    const { year = new Date().getFullYear() } = req.query;
    
    const [seasonalData, statusData, dailyActivityData] = await Promise.all([
      // Seasonal data
      BookingsModel.aggregate([
        {
          $match: {
            from: { 
              $regex: year.toString() 
            }
          }
        },
        {
          $group: {
            _id: { $substr: ['$from', 5, 2] },
            bookingCount: { $sum: 1 },
            revenue: { $sum: '$totalprice' },
            avgDuration: { $avg: '$totaldays' }
          }
        },
        {
          $sort: { _id: 1 }
        }
      ]),
      
      // Status data
      BookingsModel.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
            revenue: { $sum: '$totalprice' }
          }
        }
      ]),
      
      // Daily activity data
      Promise.all([
        // Day of week
        BookingsModel.aggregate([
          {
            $addFields: {
              dateObj: { $toDate: '$date' }
            }
          },
          {
            $group: {
              _id: { $dayOfWeek: '$dateObj' },
              bookingCount: { $sum: 1 },
              revenue: { $sum: '$totalprice' }
            }
          },
          {
            $sort: { _id: 1 }
          }
        ]),
        
        // Hourly
        BookingsModel.aggregate([
          {
            $addFields: {
              dateObj: { $toDate: '$date' }
            }
          },
          {
            $group: {
              _id: { $hour: '$dateObj' },
              bookingCount: { $sum: 1 }
            }
          },
          {
            $sort: { _id: 1 }
          }
        ])
      ])
    ]);
    
    // Format seasonal data
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formattedSeasonalData = months.map((month, index) => {
      const monthNum = String(index + 1).padStart(2, '0');
      const monthData = seasonalData.find(item => item._id === monthNum) || {
        bookingCount: 0,
        revenue: 0,
        avgDuration: 0
      };
      
      return {
        month,
        bookingCount: monthData.bookingCount,
        revenue: monthData.revenue,
        avgDuration: monthData.avgDuration ? parseFloat(monthData.avgDuration.toFixed(1)) : 0
      };
    });
    
    // Format status data
    const formattedStatusData = statusData.map(item => ({
      status: item._id,
      count: item.count,
      revenue: item.revenue
    }));
    
    // Format daily activity data
    const [dayOfWeekData, hourlyData] = dailyActivityData;
    
    // Format day of week data
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const formattedDayData = daysOfWeek.map((day, index) => {
      const dayData = dayOfWeekData.find(item => item._id === index + 1) || {
        bookingCount: 0,
        revenue: 0
      };
      
      return {
        day,
        bookingCount: dayData.bookingCount,
        revenue: dayData.revenue
      };
    });
    
    // Format hourly data
    const formattedHourlyData = Array.from({ length: 24 }, (_, i) => {
      const hour = i;
      const hourData = hourlyData.find(item => item._id === hour) || {
        bookingCount: 0
      };
      
      return {
        hour: `${hour}:00`,
        bookingCount: hourData.bookingCount
      };
    });
    
    res.json({
      seasonalPatterns: formattedSeasonalData,
      statusOverview: formattedStatusData,
      dailyActivity: {
        dayOfWeek: formattedDayData,
        hourly: formattedHourlyData
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booking analytics', error: error.message });
  }
};
