import { model } from "mongoose";

const GuideModel = model('Guides',{
    id: {
        type: Number,
        required: true,
    },
    guideName: {
        type: String,
        required: true,
    },
   
    areas: {
        type: String,
        required: true,
    },
    languages: {
        type: String
        
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
        default: Date.now,
    },
    nic: {
        type: String,
        default: false,
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5, 
    },
  });
  
export { GuideModel }