// controllers/adminPostController.js
const Post = require('../models/post');

// ===============================
// Get All Posts
// ===============================
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json({ success: true, count: posts.length, data: posts });
  } catch (error) {
    console.error("❌ Error fetching posts:", error);
    res.status(500).json({ success: false, message: "Server error while fetching posts." });
  }
};

// ===============================
// Update Post Status (Your Code)
// ===============================
exports.updatePostStatus = async (req, res) => {
  try {
    const { postId } = req.params;
    let { action } = req.body; // action sent by admin

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found.' });

    // Define allowed actions based on current status
    let allowedActions = [];
    if (post.status === 'pending') allowedActions = ['approve', 'reject'];
    else if (post.status === 'approved') allowedActions = ['hide', 'delete'];
    else if (post.status === 'rejected') allowedActions = ['delete'];

    if (!allowedActions.includes(action)) {
      return res.status(400).json({
        message: `Invalid action for this post. Allowed actions: ${allowedActions.join(', ')}`
      });
    }

    // Update status based on action
    switch (action) {
      case 'approve':
        post.status = 'approved';
        break;
      case 'reject':
        post.status = 'rejected';
        break;
      case 'hide':
        post.status = 'hidden'; // more clear than 'hide'
        break;
      case 'delete':
        post.status = 'deleted';
        break;
    }

    await post.save();

    res.status(200).json({
      success: true,
      message: `Post status updated to ${post.status}.`,
      post
    });

  } catch (error) {
    console.error('❌ Error updating post status:', error);
    res.status(500).json({ success: false, message: 'Server error while updating post status.' });
  }
};

// ===============================
// Bulk Update Posts
// ===============================
exports.bulkUpdatePosts = async (req, res) => {
  try {
    const { updates } = req.body; 
    // Example: updates = [{ postId: "123", action: "approve" }, { postId: "456", action: "delete" }]

    const results = [];

    for (let update of updates) {
      const post = await Post.findById(update.postId);
      if (!post) continue;

      // Similar validation as updatePostStatus
      let allowedActions = [];
      if (post.status === 'pending') allowedActions = ['approve', 'reject'];
      else if (post.status === 'approved') allowedActions = ['hide', 'delete'];
      else if (post.status === 'rejected') allowedActions = ['delete'];

      if (!allowedActions.includes(update.action)) continue;

      switch (update.action) {
        case 'approve':
          post.status = 'approved';
          break;
        case 'reject':
          post.status = 'rejected';
          break;
        case 'hide':
          post.status = 'hidden';
          break;
        case 'delete':
          post.status = 'deleted';
          break;
      }

      await post.save();
      results.push(post);
    }

    res.status(200).json({
      success: true,
      count: results.length,
      data: results
    });

  } catch (error) {
    console.error("❌ Error in bulkUpdatePosts:", error);
    res.status(500).json({ success: false, message: "Server error while bulk updating posts." });
  }
};
