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
  name: {
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

  mainImages: {
    type: [String],
    default: [],
    required: true,
  },

  cardImages: {
    type: [String],
    default: [],
    required: true,
  },
  images: {
    type: [String],
    default: [],
   
  },
  
  miniDescription: {
    type: String,
    required: true,
  },
});
export { DestinationModel };

