// controllers/adminPostController.js
const Post = require('../models/post');

// Admin action: approve, reject, hide, or delete a post
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
    switch(action) {
      case 'approve':
        post.status = 'approved';
        break;
      case 'reject':
        post.status = 'rejected';
        break;
      case 'hide':
        post.status = 'hide'; // or you could create a separate 'hidden' status
        break;
      case 'delete':
        post.status = 'deleted';
        break;
    }

    await post.save();

    res.status(200).json({
      message: `Post status updated to ${post.status}.`,
      post
    });

  } catch (error) {
    console.error('Error updating post status:', error);
    res.status(500).json({ message: 'Server error while updating post status.' });
  }
};
