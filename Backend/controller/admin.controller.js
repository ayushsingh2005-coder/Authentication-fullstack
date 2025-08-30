const User = require('../models/user.model');
const Post = require('../models/post.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Admin authentication
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user || user.role !== 'admin') {
      return res.status(401).json({ message: 'Admin access denied.' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const adminToken = jwt.sign(
      { id: user._id, role: user.role, isAdmin: true },
      process.env.ADMIN_JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      message: 'Admin login successful',
      token: adminToken,
      admin: {
        id: user._id,
        email: user.email,
        role: user.role,
        permissions: user.adminPermissions || []
      }
    });

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error during admin login.' });
  }
};

// Get all users for admin management
exports.getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20, search, role } = req.query;
    
    const filter = {};
    if (search) {
      filter.$or = [
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    if (role && role !== 'all') filter.role = role;

    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(filter);

    res.json({
      users,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        count: users.length,
        totalUsers: total
      }
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error while fetching users.' });
  }
};

// Update user role
exports.updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role, permissions } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    user.role = role;
    if (permissions) user.adminPermissions = permissions;
    user.roleUpdatedBy = req.admin._id;
    user.roleUpdatedAt = new Date();

    await user.save();

    res.json({
      message: 'User role updated successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        permissions: user.adminPermissions
      }
    });

  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ message: 'Server error while updating user role.' });
  }
};

// Get admin dashboard analytics
exports.getDashboardAnalytics = async (req, res) => {
  try {
    const { timeframe = '7d' } = req.query;
    const startDate = getStartDate(timeframe);

    const analytics = await Promise.all([
      // Total counts
      User.countDocuments(),
      Post.countDocuments(),
      Post.countDocuments({ status: 'pending' }),
      Post.countDocuments({ status: 'approved' }),
      Post.countDocuments({ status: 'rejected' }),

      // Posts over time
      Post.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ]),

      // Recent activity
      Post.find()
        .sort({ createdAt: -1 })
        .limit(10)
        .populate('author', 'username email')
    ]);

    res.json({
      totalUsers: analytics[0],
      totalPosts: analytics[1],
      pendingPosts: analytics[2],
      approvedPosts: analytics[3],
      rejectedPosts: analytics[4],
      postsOverTime: analytics[5],
      recentPosts: analytics[6]
    });

  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ message: 'Server error while fetching analytics.' });
  }
};

// Helper function
function getStartDate(timeframe) {
  const now = new Date();
  switch(timeframe) {
    case '1d': return new Date(now - 24 * 60 * 60 * 1000);
    case '7d': return new Date(now - 7 * 24 * 60 * 60 * 1000);
    case '30d': return new Date(now - 30 * 24 * 60 * 60 * 1000);
    default: return new Date(now - 7 * 24 * 60 * 60 * 1000);
  }
}