import { TransportationServiceModel } from '../models/Transportation.js';

export const getTransportationAnalytics = async (req, res) => {
  try {
    // Get the count of available vehicles per service
    const services = await TransportationServiceModel.aggregate([
      {
        $project: {
          transportationServiceName: 1,
          availableVehicles: { $size: "$availableVehicles" },
        },
      },
    ]);

    // Get vehicle availability categories (small, medium, large)
    const categoryCounts = await TransportationServiceModel.aggregate([
      {
        $project: {
          transportationServiceName: 1,
          availableVehicles: 1,
        },
      },
      {
        $unwind: "$availableVehicles",
      },
      {
        $group: {
          _id: "$availableVehicles.category",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          category: "$_id",
          count: 1,
          _id: 0
        }
      }
    ]);

    res.json({ 
      services, 
      categoryCounts 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to load transportation analytics' });
  }
};
