import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import pkg from 'cloudinary';
import path from 'path';
const { v2: cloudinary } = pkg;
import dotenv from 'dotenv';
import cors from 'cors';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { Router } from './routes/routes.js';
import cityRouter from './routes/cityRouter.js';
import bookingRouter from './routes/bookingRote.js';
import hotelRouter from './routes/hotelRoute.js';
import transportationrouter from './routes/transportationRoute.js';
import userRouter from './routes/userRoute.js';
// import bookingScheduler from './schedulers/bookingScheduler.js';
import transportationrouter from './routes/transportationRoute.js';  // Existing transportation route
import transportationAnalyticRouter from './routes/transportationAnalyticRoute.js'; // New transportation analytics route
import userAnalyticsRoutes from './routes/userAnalyticsRoutes.js';
import bookingAnalyticsRoutes from './routes/bookingAnalyticsRoutes.js';
import adminAuthRoutes from './routes/adminAuthRoutes.js'; 
import guideAnalyticsRoutes from './routes/guideAnalyticsRoutes.js';
import destinationAnlyticsRoutes from './routes/destinationAnlyticsRoutes.js';

dotenv.config();

// Add JWT secret to environment variables
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'travelmate-admin-secret-key'; 
}

const app = express();
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

// Image uploading API
app.post('/upload', upload.single('image'), (req, res) => {
  res.json({
    success: true,
    image_url: req.file.path,
  });
});

// MongoDB configuration
mongoose.connect("mongodb+srv://travelmate:hy6QuIubRgLzBPjm@cluster0.1pbng.mongodb.net/TravelMate");

//router
app.use("/travelmate",Router)
app.use("/cities",cityRouter);

app.use("/booking",bookingRouter);

app.use("/hotels",hotelRouter)

app.use("/transportation",transportationrouter);

app.use('/user',userRouter);






// bookingScheduler.updateExpiredBookings();
// Routes
app.use("/travelmate", Router);
app.use("/cities", cityRouter);
app.use("/booking", bookingRouter);
app.use("/hotels", hotelRouter);
app.use("/transportation", transportationrouter);
app.use('/api/user-analytics', userAnalyticsRoutes);
app.use('/api/booking-analytics', bookingAnalyticsRoutes);
app.use('/api/guide-analytics', guideAnalyticsRoutes);
app.use('/api/destination-analytics', destinationAnlyticsRoutes);
app.use('/api/transportation-analytics', transportationAnalyticRouter);  // New analytics route

// Admin authentication routes
app.use('/api/admin', adminAuthRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
