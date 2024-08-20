const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

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

// MongoDB configuration
mongoose.connect("mongodb+srv://travelmate:hy6QuIubRgLzBPjm@cluster0.1pbng.mongodb.net/TravelMate");





// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});