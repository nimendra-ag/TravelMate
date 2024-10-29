import { model } from "mongoose";

const DestinationModel = model("Destinations", {
  id: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    default: "Destinations",
  },
  destinationName: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },

  distanceFromColombo: {
    type: Number,
    required: true,
  },

  category: {
    type: [String],
    required: true,
  },
  bestTimeToVisit: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: false,
  },
  contactNumber: {
    type: String,
    required: false,
  },
  openingHours: {
    type: [Array], // Array of strings for hours
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
});
export { DestinationModel };

