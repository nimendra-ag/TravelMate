import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import pkg from 'cloudinary';
import path from 'path';
const { v2: cloudinary } = pkg;
import dotenv from 'dotenv';
import cors from 'cors';
import CloudinaryStorage from 'multer-storage-cloudinary';
import {Router} from './routes/routes.js'
import cityRouter from './routes/cityRouter.js';
import bookingRouter from './routes/bookingRote.js';
// import bookingScheduler from './schedulers/bookingScheduler.js';
import client from 'prom-client';

const app = express();

//--------------------------------------------- Prometheus Metrics ----------------------------------------------------------
client.collectDefaultMetrics();

export const httpRequestCounter = new client.Counter({
    name: "http_request_total",
    help: "Total number of HTTP requests",
    labelNames: ["method", "route", "status_code"],
});

app.use((req, res, next) => {
    res.on("finish", () => {
        httpRequestCounter.inc({
            method: req.method,
            route: req.route?.path || req.path,
            status_code: res.statusCode,
        });
    });
    next();
});

app.get("/metrics", async (req, res) => {
    res.set("Content-Type", client.register.contentType);
    res.end(await client.register.metrics());
});


//------------------------------------------------------------------------------------------------------------------------------------
dotenv.config();


const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());


// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage });

//image uploading api
app.post('/upload',upload.single('image'), (req, res)=>{  
  // console.log(req.file)
  res.json({
      success:true,
      image_url: req.file.path
  })
})

// MongoDB configuration
mongoose.connect("mongodb+srv://travelmate:hy6QuIubRgLzBPjm@cluster0.1pbng.mongodb.net/TravelMate");

//router
app.use("/travelmate",Router)
app.use("/cities",cityRouter);

app.use("/booking",bookingRouter);

// bookingScheduler.updateExpiredBookings();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});