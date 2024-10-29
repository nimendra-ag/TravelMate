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
  name: {
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
    type: String, 
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  email: {
    type: String, 
    required: false, 
  },
  website: {
    type: String,
    required: false, 
  },
  openingHours: {
    type: [Array], // Array of strings for hours
    required: true,
  },
  priceRange: {
    type: [String], 
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
