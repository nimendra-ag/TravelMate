// import { scheduleJob } from "node-schedule";
// import { BookingsModel } from "../models/Bookings.js";
// import { AccommodationModel } from "../models/Accommodation.js";
// import moment from "moment";




// async function updateExpiredBookings() {
//     try {
//         const now = moment().toDate();
        

//         // Find all active bookings where the end date has passed
//         const expiredBookings = await BookingsModel.find({
//             status: "active",
//             to: { $lte: now },
//         });

//         for (const booking of expiredBookings) {
//             // Update the booking status to "ended"
//             booking.status = "ended";
//             await booking.save();

//             // Update room availability
//             const accommodation = await AccommodationModel.findOneAndUpdate(
//                 { "id": booking.accommodation.id },
//                 {
//                     $inc: { [`rooms.${[booking.room.id]}.available`]: booking.roomcount },
//                 },
//                 { new: true }
//             );

//             if (!accommodation) {
//                 console.error(`Failed to update accommodation for booking ${booking.id}`);
//                 continue;
//             }

//             console.log(`Booking ${booking.id} ended and room availability updated`);
//         }
//     } catch (error) {
//         console.error("Error updating expired bookings:", error);
//     }
// }

// // Schedule the job to run every hour
// scheduleJob("0 * * * *", updateExpiredBookings);



// export default { updateExpiredBookings };
