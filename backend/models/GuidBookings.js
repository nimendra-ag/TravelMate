import { model } from "mongoose";

const Guidooking = model("GuidBookings", {


    user: {
        type: Object,
        required: true
    },
    guide: {
        type: Object,
        required: true
    },
    fromDate: {
        type: String,
        required: true
    },
    toDate: {
        type: String,
        required: true
    },
    totaldays: {
        type: Number,
        required: true
    },
    totalprice: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: "Booked"
    }




});