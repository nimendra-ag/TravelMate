import { model } from "mongoose";
const GuideReviewModel = model('guideReviews',{
    id:{
        type:Number,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    guideId:{
        type:Number,
        required:true
    },
    overallRating:{
        type: Number,
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
     reviewTitle:{
        type:String,
        required: true
    },
    reviewBody:{
        type:String,
        required: true
    },
    recommendation: {
        type: String,
        required: true 
    },
    createdAt: {
        type: Date,
        default: Date.now  
    },
    country: {
        type: String,
        required: true
    },
})
export{GuideReviewModel}