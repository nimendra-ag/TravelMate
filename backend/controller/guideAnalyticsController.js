import { GuideModel } from '../models/Guide.js';

export const getGuideDistributionByArea = async (req, res) => {
  try {
    const result = await GuideModel.aggregate([
      { $group: { _id: "$area", count: { $sum: 1 } } }
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLanguageProficiency = async (req, res) => {
  try {
    const result = await GuideModel.aggregate([
      { $unwind: "$languages" },
      { $group: { _id: "$languages", count: { $sum: 1 } } }
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAgeDistribution = async (req, res) => {
  try {
    const result = await GuideModel.aggregate([
      {
        $bucket: {
          groupBy: "$age",
          boundaries: [20, 30, 40, 50, 60],
          default: "60+",
          output: { count: { $sum: 1 } }
        }
      }
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRatingAnalysis = async (req, res) => {
  try {
    const result = await GuideModel.aggregate([
      {
        $bucket: {
          groupBy: "$rating",
          boundaries: [0, 1, 2, 3, 4, 5],
          default: "5+",
          output: { count: { $sum: 1 } }
        }
      }
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};