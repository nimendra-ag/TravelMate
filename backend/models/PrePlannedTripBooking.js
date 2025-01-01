import { model } from "mongoose";

const PrePlannedTripBookingModel = model("PrePlannedTripBooking", {
  id: {
    type: Number,
    required: true,
  },
  
  prePlannedTripId: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  
  email: {
    type: String,
    required: true,
  },
  travelerName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  
  adults: {
    type: Number,
    required: true,
  },
  kids: {
    type: Number,
    required: true,
  },
  
});

export { PrePlannedTripBookingModel };
