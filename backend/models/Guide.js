import { model } from "mongoose";

const GuideModel = model("Guides", {
  id: {
    type: Number,
    required: true,
  },
  type:{
    type: String,
    default: "Guides"
  },
  guideName: {
    type: String,
    required: true,
  },

  area: {
    type: [String],
    required: true,
  },
  languages: {
    type: [String],
    required: true,
  },
  chargesPerDay: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  nic: {
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

export { GuideModel };
