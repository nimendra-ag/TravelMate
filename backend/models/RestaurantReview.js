import { model } from "mongoose";
const RestaurantReviewModel = model('restaurantReviews',{
    id:{
        type:Number,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    restaurantId:{
        type:Number,
        required:true
    },
    overallRating:{
        type: Number,
        required:true
    },
    foodRating:{
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
    atmosphereRating:{
        type:Number,
        required:true
    },
    visitDate:{
        type:String,
        required:true
    },
    familyType:{
        type:String,
        required:true
    },
    mealType:{
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


export{RestaurantReviewModel}