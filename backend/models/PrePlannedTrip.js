import { model } from "mongoose";

const PrePlannedTripModel = model("PrePlannedTrips", {
  id: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    default: "PrePlannedTrips",
  },
  name: {
    type: String,
    required: true,
  },
  mainDestinations: {
    type: [String],
    required: true,
  },
  guides: {
    type: [String],
    required: true,
  },
  mainActivities: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  noOfTravelers: {
    type: Number,
    required: true,
  },
  startTime: {
    type: String, // Time in "HH:MM" format
    required: true,
  },
  startLocation: {
    type: String,
    required: true,
  },
  endTime: {
    type: String, // Time in "HH:MM" format
    required: true,
  },
  endLocation: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  availableDates: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  whatsExpected: {
    type: String,
    required: true,
  },
  whatsIncluded: {
    type: String,
    required: false,
  },
  additionalInfo: {
    type: String,
    required: false,
  },
  cancellationPolicy: {
    type: String,
    required: false,
  },
  help: {
    type: String,
    required: false,
  },
  activityImages: {
    type: [String],
    default: [],
    required: true,
  },
  mainImage: {  // Changed from mainImages (array) to mainImage (single string)
    type: String,
    required: true,
  },
});

export { PrePlannedTripModel };
