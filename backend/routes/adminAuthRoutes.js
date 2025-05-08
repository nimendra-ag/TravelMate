import express from 'express';
import jwt from 'jsonwebtoken';
import AdminUser from '../models/AdminUser.js';
import { adminAuth } from '../middleware/adminAuth.js';

const router = express.Router();

// Admin registration
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Check if admin user already exists
    const existingUser = await AdminUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Admin user already exists with this email' });
    }

    // Create new admin user
    const newAdminUser = new AdminUser({
      fullName,
      email,
      password
    });

    await newAdminUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newAdminUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Update last login
    newAdminUser.lastLogin = Date.now();
    await newAdminUser.save();

    res.status(201).json({
      token,
      user: {
        id: newAdminUser._id,
        fullName: newAdminUser.fullName,
        email: newAdminUser.email,
        role: newAdminUser.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin user by email
    const adminUser = await AdminUser.findOne({ email });
    if (!adminUser) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await adminUser.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: adminUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Update last login
    adminUser.lastLogin = Date.now();
    await adminUser.save();

    res.json({
      token,
      user: {
        id: adminUser._id,
        fullName: adminUser.fullName,
        email: adminUser.email,
        role: adminUser.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Get current admin user
router.get('/me', adminAuth, async (req, res) => {
  try {
    res.json({
      user: {
        id: req.adminUser._id,
        fullName: req.adminUser.fullName,
        email: req.adminUser.email,
        role: req.adminUser.role
      }
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin logout (optional - client side can simply remove token)
router.post('/logout', adminAuth, async (req, res) => {
  try {
    // Nothing needs to be done on server for JWT auth
    // Just sending success response to confirm action
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Server error during logout' });
  }
});

export default router;