import { model } from "mongoose";

const AccommodationModel = model('Accommodations',{
    id: {
        type: Number,
        required: true,
    },
    hotel_name: {
        type: String,
        required: true,
    },
    address: {
      type: String,
      required: true,
    },
    description: {
        type: String,
        required: true,
    },
    cardImage: {
        type: String
        
    },
    category: {
        type: String,
        required: true,
    },
    distance_from_city: {
      type: String,
      required: true,
    },
    perPerson_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: false,
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5, 
    },
  });
  
export { AccommodationModel }