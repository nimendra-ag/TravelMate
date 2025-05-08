import mongoose
 from "mongoose";
 const HospitalModel = mongoose.model("Hospitals", {
   id: {
     type: Number,
     required: true,
   },
   type: {
     type: String,
     default: "Hospitals"
   },
   name: {
     type: String,
     required: true,
   },
   address: {
     type: String,
     required: true,
   },
   contactNumber: {
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
   image: {
     type: String,
     required: false,
   },
   category: {
     type: String,
     required: true,
   },
   nearestCity: {
     type: String,
     required: true,
   },
   distanceFromNearestCity: {
     type: Number,
     required: true,
   },
   description:{
    type: String,
    required: true,
   },

 });
 
 export { HospitalModel };
 