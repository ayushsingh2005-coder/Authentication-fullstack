const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Check if user is admin
exports.requireAdmin = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '') || 
                  req.header('x-auth-token');
    
    if (!token) {
      return res.status(401).json({ message: 'Admin access denied. No token provided.' });
    }

    // Try admin JWT secret first, then regular JWT secret
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
    } catch {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    }

    const user = await User.findById(decoded.id);
    
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin privileges required.' });
    }

    req.admin = user;
    req.user = user; // For compatibility with existing middleware
    next();

  } catch (error) {
    console.error('Admin auth error:', error);
    res.status(401).json({ message: 'Invalid admin token.' });
  }
};

// Check specific admin permissions
exports.requirePermission = (permission) => {
  return (req, res, next) => {
    if (!req.admin || !req.admin.adminPermissions.includes(permission)) {
      return res.status(403).json({ 
        message: `Permission denied. Required: ${permission}` 
      });
    }
    next();
  };
};