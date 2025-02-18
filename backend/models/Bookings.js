import { model } from 'mongoose'

const BookingsModel = model('Bookings', {

    id: {
        type: Number,
        required: true
    },


    user: {
        type: Object,
        required: true
    },
    accommodation: {
        type: Object,
        required: true
    },
    room: {
        type: Object,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
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
    },
    roomcount: {
        type: Number,
        required: true
    }
 
















});

export { BookingsModel }