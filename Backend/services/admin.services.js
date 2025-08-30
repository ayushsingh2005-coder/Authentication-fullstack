const User = require('../models/user.model.js');
const Post = require('../models/post.js');
const bcrypt = require('bcryptjs');

class AdminService {
  // Create first admin user
  static async createFirstAdmin(email, password) {
    try {
      const existingAdmin = await User.findOne({ email });
      if (existingAdmin) {
        throw new Error('Admin user already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const admin = new User({
        username: 'admin',
        email,
        password: hashedPassword,
        role: 'admin',
        adminPermissions: ['manage_posts', 'manage_users', 'view_analytics', 'system_settings'],
        isVerified: true
      });

      await admin.save();
      return admin;
    } catch (error) {
      throw new Error(`Failed to create admin: ${error.message}`);
    }
  }

  // Promote user to admin
  static async promoteToAdmin(userId, permissions = ['manage_posts']) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      user.role = 'admin';
      user.adminPermissions = permissions;
      user.roleUpdatedAt = new Date();

      await user.save();
      return user;
    } catch (error) {
      throw new Error(`Failed to promote user: ${error.message}`);
    }
  }

  // Get system statistics
  static async getSystemStats() {
    try {
      const stats = await Promise.all([
        User.countDocuments(),
        User.countDocuments({ role: 'admin' }),
        Post.countDocuments(),
        Post.countDocuments({ status: 'pending' }),
        Post.countDocuments({ status: 'approved' })
      ]);

      return {
        totalUsers: stats[0],
        totalAdmins: stats[1],
        totalPosts: stats[2],
        pendingPosts: stats[3],
        approvedPosts: stats[4]
      };
    } catch (error) {
      throw new Error(`Failed to get system stats: ${error.message}`);
    }
  }
}

module.exports = AdminService;