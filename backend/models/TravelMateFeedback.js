import {model} from "mongoose";
const TravelMateFeedbackModel = model('TravelMateFeedback',{
    name: {
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    feedback:{
        type: String,
        required: true
    }
})

export {TravelMateFeedbackModel}