import { model } from "mongoose";

const RestaurantModel = model("Restaurants", {
  id: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    default: "Restaurants",
  },
  restaurantName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  category: {
    type: [String],
    required: true,
  },
  contactNumber: {
    type: String, // Use String for phone numbers
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  email: {
    type: String, // Corrected type to String
    required: false, // Making it optional
  },
  website: {
    type: String,
    required: false, // Making it optional
  },
  openingHours: {
    type: [Array], // Array of strings for hours
    required: true,
  },
  priceRange: {
    type: [String], // Array of strings for hours
    required: false,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
});

export { RestaurantModel };
