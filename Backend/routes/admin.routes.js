const express = require('express');
const router = express.Router();

// Controllers
const adminController = require('../controller/admin.controller.js');
const adminPostController = require('../controller/adminPostController.js');

// Middlewares
const { requireAdmin, requirePermission } = require('../middleware/admin.middleware');

// ==========================
// Admin Authentication (Public)
// ==========================
router.post('/login', adminController.adminLogin);

// ==========================
// Apply Admin Authentication for all routes below
// ==========================
router.use(requireAdmin);

// ==========================
// Dashboard & Analytics
// ==========================
router.get('/dashboard', adminController.getDashboardAnalytics);

// ==========================
// User Management
// ==========================
router.get('/users', requirePermission('manage_users'), adminController.getAllUsers);
router.put('/users/:userId/role', requirePermission('manage_users'), adminController.updateUserRole);

// ==========================
// Post Management
// ==========================

// Get All Posts
if (adminPostController.getAllPosts) {
  router.get('/posts', requirePermission('manage_posts'), adminPostController.getAllPosts);
} else if (adminController.getAllPosts) {
  router.get('/posts', requirePermission('manage_posts'), adminController.getAllPosts);
} else {
  console.error("❌ No getAllPosts function found in controllers!");
}

// Update Post Status
if (adminPostController.updatePostStatus) {
  router.put('/posts/:postId/status', requirePermission('manage_posts'), adminPostController.updatePostStatus);
} else {
  console.error("❌ No updatePostStatus function found in adminPostController!");
}

// Bulk Update Posts
if (adminPostController.bulkUpdatePosts) {
  router.put('/posts/bulk-update', requirePermission('manage_posts'), adminPostController.bulkUpdatePosts);
} else if (adminController.bulkUpdatePosts) {
  router.put('/posts/bulk-update', requirePermission('manage_posts'), adminController.bulkUpdatePosts);
} else {
  console.error("❌ No bulkUpdatePosts function found in controllers!");
}

// ALL NEW ROUTES FOR ADMIN 














module.exports = router;
