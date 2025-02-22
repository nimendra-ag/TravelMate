import { AccommodationModel } from "../models/Accommodation.js";

// Get Price Distribution
const getPriceDistribution = async (req, res) => {
    try {
        const priceRanges = await AccommodationModel.aggregate([
            {
                $bucket: {
                    groupBy: "$perPerson_price",
                    boundaries: [0, 1000, 2000, 3000, 4000, 5000],
                    default: "5000+",
                    output: {
                        count: { $sum: 1 }
                    }
                }
            }
        ]);
        res.status(200).json({ success: true, data: priceRanges });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get Availability Status
const getAvailabilityStatus = async (req, res) => {
    try {
        const availability = await AccommodationModel.aggregate([
            {
                $group: {
                    _id: "$available",
                    count: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json({ success: true, data: availability });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get Location Data
const getLocationData = async (req, res) => {
    try {
        const locations = await AccommodationModel.aggregate([
            {
                $group: {
                    _id: "$distance_from_city",
                    count: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json({ success: true, data: locations });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get Popular Categories
const getPopularCategories = async (req, res) => {
    try {
        const categories = await AccommodationModel.aggregate([
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json({ success: true, data: categories });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get Price-Rating Data
const getPriceRatingData = async (req, res) => {
    try {
        const priceRating = await AccommodationModel.find({}, 'perPerson_price rating');
        res.status(200).json({ success: true, data: priceRating });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get Area Accommodations Count
const getAreaAccommodations = async (req, res) => {
    try {
        const areaCount = await AccommodationModel.aggregate([
            {
                $group: {
                    _id: "$distance_from_city",
                    count: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json({ success: true, data: areaCount });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export {getPriceDistribution,getAvailabilityStatus,getLocationData,getPopularCategories,getPriceRatingData,getAreaAccommodations};
