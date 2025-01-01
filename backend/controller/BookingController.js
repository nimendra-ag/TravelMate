import { AccommodationModel } from "../models/Accommodation.js";
import { BookingsModel } from "../models/Bookings.js";

export async function AddBooking(req, res) {
    try {

        const data = req.body;
        let bookings = await BookingsModel.find({});
        let id = bookings.length > 0 ? bookings[bookings.length - 1].id + 1 : 1;

        const newBooking = new BookingsModel({
            id: id,
            user: data.user,
            room: data.room,
            accommodation: data.accommodation,
            from: data.from,
            to: data.to,
            totaldays: data.totaldays,
            totalprice: data.totalprice,
            roomcount: data.roomcount
        });

        // Save the new booking
        await newBooking.save();

        // After booking is saved, update room availability
        let acc = await AccommodationModel.findOneAndUpdate({"id":
            data.accommodation.id,}, // Find the accommodation by id
            {
                $inc: { [`rooms.${[data?.room?.id]}.available`]: -data.roomcount } // Use bracket notation for dynamic key access
            },
            { new: true } // Return the updated document
        );
        
        if (!acc) {
            console.error("Accommodation not found or update failed.");
            return res.status(400).json({ error: "Accommodation update failed" }); // Send error response if accommodation is not found
        }
        
        

        // Send a success response after both operations succeed
        res.status(200).json({
            message: "Booking Saved Successfully",
        });

   
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Booking Failed" }); // Handle any errors
    }
}

export function getBookings(req, res) {

    const userEmail = req.query.email;
    console.log(userEmail);


    


    
    BookingsModel.find( 
        { "user.email": userEmail }
    ).then((data) => {
        
        res.status(200).json(data)




    
    }).catch((err) => {
        
        
        
        console.log(err); })
}


export function deleteBooking(req, res) {


    console.log("Delete Booking");
    
    
    const bookingId = req.query.id;
    console.log(bookingId);

    BookingsModel.findByIdAndDelete(bookingId).then((data) => {
        res.status(200).json(data);
    }).then(






        
    )
    
    
    
    
    .catch((err) => {
        console.log(err);
    })}