import { model } from "mongoose";
const HotelReviewModel = model('hotelReviews',{
    id:{
        type:Number,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    hotelId:{
        type:Number,
        required:true
    },
    overallRating:{
        type: Number,
        required:true
    },
    roomRating:{
        type:Number,
        required:true
    },
    serviceRating:{
        type:Number,
        required:true
    },
    valueRating:{
        type:Number,
        required:true
    },
    locationRating:{
        type:Number,
        required:true
    },
    visitDate:{
        type:String,
        required:true
    },
    travelType:{
        type:String,
        required:true
    },
    stayDuration:{
        type:String,
        required: true
    },
    reviewTitle:{
        type:String,
        required: true
    },
    reviewBody:{
        type:String,
        required: true
    }
})
export{HotelReviewModel}