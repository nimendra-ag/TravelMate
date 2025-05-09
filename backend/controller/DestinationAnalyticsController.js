import { DestinationModel } from '../models/Destination.js';

export const getDestinations = async (req, res) => {
  try {
    const destinations = await DestinationModel.find();
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDestinationStats = async (req, res) => {
  try {
    // Category distribution
    const categoryDistribution = await DestinationModel.aggregate([
      { $unwind: '$category' },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $project: { category: '$_id', count: 1, _id: 0 } }
    ]);

    // Distance distribution
    const distanceDistribution = await DestinationModel.aggregate([
      {
        $bucket: {
          groupBy: '$distanceFromColombo',
          boundaries: [0, 50, 100, 150, 200, 300, 500],
          default: '500+',
          output: {
            count: { $sum: 1 },
            destinations: { $push: { name: '$name', distance: '$distanceFromColombo' } }
          }
        }
      },
      {
        $project: {
          range: {
            $cond: [
              { $eq: ['$_id', '500+'] },
              '500+',
              { $concat: [{ $toString: '$_id' }, '-', { $toString: { $arrayElemAt: ['$boundaries', { $add: [{ $indexOfArray: ['$boundaries', '$_id'] }, 1] }] } }] }
            ]
          },
          count: 1,
          destinations: 1
        }
      }
    ]);

    // Rating distribution
    const ratingDistribution = await DestinationModel.aggregate([
      {
        $group: {
          _id: { $round: ['$rating', 1] },
          count: { $sum: 1 },
          destinations: { $push: '$name' }
        }
      },
      { $sort: { _id: 1 } },
      { $project: { rating: '$_id', count: 1, destinations: 1, _id: 0 } }
    ]);

    // Best time to visit distribution
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Initialize monthCounts with all months set to 0
    const monthCounts = months.reduce((acc, month) => ({...acc, [month]: 0}), {});
    
    // Parse the bestTimeToVisit string and update counts
    const destinations = await DestinationModel.find({}, 'bestTimeToVisit');
    destinations.forEach(dest => {
      if (dest.bestTimeToVisit) {
        const periods = dest.bestTimeToVisit.split('-');
        if (periods.length === 2) {
          const startIdx = months.indexOf(periods[0]);
          const endIdx = months.indexOf(periods[1]);
          
          if (startIdx !== -1 && endIdx !== -1) {
            if (startIdx <= endIdx) {
              for (let i = startIdx; i <= endIdx; i++) {
                monthCounts[months[i]]++;
              }
            } else {
              // Handle ranges that cross year boundary (e.g., Nov-Feb)
              for (let i = startIdx; i < months.length; i++) {
                monthCounts[months[i]]++;
              }
              for (let i = 0; i <= endIdx; i++) {
                monthCounts[months[i]]++;
              }
            }
          }
        }
      }
    });
    
    const bestTimeDistribution = months.map(month => ({
      month,
      count: monthCounts[month]
    }));

    // Category count
    const categoryCounts = await DestinationModel.aggregate([
      { $unwind: '$category' },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $project: { category: '$_id', count: 1, _id: 0 } }
    ]);

    res.status(200).json({
      categoryDistribution,
      distanceDistribution,
      ratingDistribution,
      bestTimeDistribution,
      categoryCounts
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};