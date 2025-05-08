import { UserModel } from '../models/User.js';
import moment from 'moment';

// Get age distribution of users
export const getAgeDistribution = async (req, res) => {
  try {
    const users = await UserModel.find({ birthday: { $exists: true, $ne: null } });
    
    // Define age groups
    const ageGroups = {
      '18-24': 0,
      '25-34': 0,
      '35-44': 0,
      '45-54': 0,
      '55-64': 0,
      '65+': 0
    };
    
    // Calculate age for each user and increment appropriate group
    users.forEach(user => {
      if (user.birthday) {
        const age = moment().diff(moment(user.birthday), 'years');
        
        if (age < 18) return; // Skip if under 18
        else if (age <= 24) ageGroups['18-24']++;
        else if (age <= 34) ageGroups['25-34']++;
        else if (age <= 44) ageGroups['35-44']++;
        else if (age <= 54) ageGroups['45-54']++;
        else if (age <= 64) ageGroups['55-64']++;
        else ageGroups['65+']++;
      }
    });
    
    // Convert to array format for recharts
    const ageDistribution = Object.keys(ageGroups).map(group => ({
      ageGroup: group,
      count: ageGroups[group]
    }));
    
    res.json(ageDistribution);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching age distribution', error: error.message });
  }
};

// Get gender distribution
export const getGenderDistribution = async (req, res) => {
  try {
    const genderCounts = await UserModel.aggregate([
      { $match: { gender: { $exists: true, $ne: null } } },
      { $group: { _id: '$gender', count: { $sum: 1 } } }
    ]);
    
    const genderDistribution = genderCounts.map(item => ({
      gender: item._id,
      count: item.count
    }));
    
    res.json(genderDistribution);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching gender distribution', error: error.message });
  }
};

// Get geographic distribution
export const getGeographicDistribution = async (req, res) => {
  try {
    const countryCounts = await UserModel.aggregate([
      { $match: { country: { $exists: true, $ne: null } } },
      { $group: { _id: '$country', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    const geographicDistribution = countryCounts.map(item => ({
      country: item._id,
      count: item.count
    }));
    
    res.json(geographicDistribution);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching geographic distribution', error: error.message });
  }
};

// Get top 10 countries
export const getTopCountries = async (req, res) => {
  try {
    const topCountries = await UserModel.aggregate([
      { $match: { country: { $exists: true, $ne: null } } },
      { $group: { _id: '$country', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);
    
    const result = topCountries.map(item => ({
      country: item._id,
      count: item.count
    }));
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching top countries', error: error.message });
  }
};

// Get user registration trends
export const getUserRegistrationTrends = async (req, res) => {
  try {
    const { period = 'monthly' } = req.query;
    
    // Determine date format based on period
    let dateFormat;
    let groupBy;
    
    switch(period) {
      case 'daily':
        dateFormat = '%Y-%m-%d';
        groupBy = { year: { $year: '$_id' }, month: { $month: '$_id' }, day: { $dayOfMonth: '$_id' } };
        break;
      case 'weekly':
        dateFormat = '%Y-W%U';
        groupBy = { year: { $year: '$_id' }, week: { $week: '$_id' } };
        break;
      case 'monthly':
      default:
        dateFormat = '%Y-%m';
        groupBy = { year: { $year: '$_id' }, month: { $month: '$_id' } };
        break;
    }
    
    // Assuming _id contains the creation date or we can use the ObjectId to extract creation time
    const registrationTrends = await UserModel.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: dateFormat, date: { $toDate: { $convert: { input: { $substr: ['$_id', 0, 8] }, to: 'string' } } } }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    const result = registrationTrends.map(item => ({
      date: item._id,
      count: item.count
    }));
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching registration trends', error: error.message });
  }
};

// Get all user analytics data in one call
export const getAllUserAnalytics = async (req, res) => {
  try {
    const [ageDistribution, genderDistribution, geographicDistribution, topCountries, registrationTrends] = await Promise.all([
      UserModel.aggregate([
        { $match: { birthday: { $exists: true, $ne: null } } },
        {
          $project: {
            age: {
              $floor: {
                $divide: [
                  { $subtract: [new Date(), '$birthday'] },
                  365 * 24 * 60 * 60 * 1000
                ]
              }
            }
          }
        },
        {
          $bucket: {
            groupBy: '$age',
            boundaries: [18, 25, 35, 45, 55, 65, 100],
            default: 'Other',
            output: { count: { $sum: 1 } }
          }
        }
      ]),
      
      UserModel.aggregate([
        { $match: { gender: { $exists: true, $ne: null } } },
        { $group: { _id: '$gender', count: { $sum: 1 } } }
      ]),
      
      UserModel.aggregate([
        { $match: { country: { $exists: true, $ne: null } } },
        { $group: { _id: '$country', count: { $sum: 1 } } }
      ]),
      
      UserModel.aggregate([
        { $match: { country: { $exists: true, $ne: null } } },
        { $group: { _id: '$country', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ]),
      
      UserModel.aggregate([
        {
          $group: {
            _id: {
              $dateToString: { format: '%Y-%m', date: { $toDate: { $convert: { input: { $substr: ['$_id', 0, 8] }, to: 'string' } } } }
            },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ])
    ]);
    
    // Format age distribution
    const formattedAgeDistribution = ageDistribution.map(group => ({
      ageGroup: group._id === 18 ? '18-24' :
                group._id === 25 ? '25-34' :
                group._id === 35 ? '35-44' :
                group._id === 45 ? '45-54' :
                group._id === 55 ? '55-64' :
                group._id === 65 ? '65+' : 'Other',
      count: group.count
    }));
    
    // Format gender distribution
    const formattedGenderDistribution = genderDistribution.map(item => ({
      gender: item._id,
      count: item.count
    }));
    
    // Format geographic distribution
    const formattedGeographicDistribution = geographicDistribution.map(item => ({
      country: item._id,
      count: item.count
    }));
    
    // Format top countries
    const formattedTopCountries = topCountries.map(item => ({
      country: item._id,
      count: item.count
    }));
    
    // Format registration trends
    const formattedRegistrationTrends = registrationTrends.map(item => ({
      date: item._id,
      count: item.count
    }));
    
    res.json({
      ageDistribution: formattedAgeDistribution,
      genderDistribution: formattedGenderDistribution,
      geographicDistribution: formattedGeographicDistribution,
      topCountries: formattedTopCountries,
      registrationTrends: formattedRegistrationTrends
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user analytics', error: error.message });
  }
};