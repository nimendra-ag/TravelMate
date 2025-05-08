import jwt from 'jsonwebtoken';
import AdminUser from '../models/AdminUser.js';

export const adminAuth = async (req, res, next) => {
  try {
    // Check for token in headers
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find admin user by id
    const adminUser = await AdminUser.findById(decoded.id);
    
    if (!adminUser) {
      return res.status(401).json({ message: 'Authentication invalid' });
    }

    // Attach admin user to request object
    req.adminUser = adminUser;
    req.token = token;
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Authentication failed' });
  }
};

// Optional middleware for super admin access only
export const superAdminOnly = (req, res, next) => {
  if (req.adminUser && req.adminUser.role === 'superadmin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Super admin privileges required.' });
  }
};