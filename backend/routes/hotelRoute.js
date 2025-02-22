import express from 'express';
import { addRoom,  deleteRoomImage, editRoom } from '../controller/AccommodationController.js';
const hotelRouter = express.Router();

hotelRouter.post("/addroom",addRoom)

hotelRouter.delete("/deleteroomimage",deleteRoomImage)

hotelRouter.put("/editroom",editRoom)





export default hotelRouter;