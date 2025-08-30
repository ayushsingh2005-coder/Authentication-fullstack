// controllers/postController.js
const Post = require("../models/post");

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    // const userId = req.user._id; // assuming you have authentication middleware
    // const us erId = localStorage.getItem('userData');
    console.log(userId);

    if (!content || content.trim() === "") {
      return res.status(400).json({ message: "Post content is required." });
    }

    const newPost = new Post({
      title,
      content,
      user: userId,
      status: "pending", // new posts are pending admin approval by default
    });

    await newPost.save();

    res.status(201).json({
      message: "Post created successfully and is pending approval.",
      post: newPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Server error while creating post." });
  }
};

exports.getSinglePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId).populate("user", "name email"); // populate user info (only name & email)
    // .populate('comments');               // optional: populate comments if needed

    if (!post || post.status === "deleted") {
      return res
        .status(404)
        .json({ message: "Post not found or has been deleted." });
    }

    res.status(200).json({
      message: "Post fetched successfully",
      post,
    });
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Server error while fetching post." });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    // const userId = req.user._id; // assuming user is authenticated

    if (!content || content.trim() === "") {
      return res.status(400).json({ message: "Post content cannot be empty." });
    }

    const post = await Post.findById(postId);

    if (!post || post.status === "deleted") {
      return res
        .status(404)
        .json({ message: "Post not found or has been deleted." });
    }

    // if (post.user.toString() !== userId.toString()) {
    //   return res.status(403).json({ message: 'You are not authorized to update this post.' });
    // }

    // Optional: allow updates only if post is pending or approved
    if (!["pending", "approved"].includes(post.status)) {
      return res
        .status(400)
        .json({
          message: `Cannot update a post with status '${post.status}'.`,
        });
    }

    post.content = content;
    post.updatedAt = Date.now();

    await post.save();

    res.status(200).json({
      message: "Post updated successfully.",
      post,
    });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Server error while updating post." });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    // const userId = req.user._id; // assuming user is authenticated

    const post = await Post.findById(postId);

    if (!post || post.status === "deleted") {
      return res
        .status(404)
        .json({ message: "Post not found or already deleted." });
    }

    // if (post.user.toString() !== userId.toString()) {
    //   return res.status(403).json({ message: 'You are not authorized to delete this post.' });
    // }

    // Soft delete: mark status as 'deleted'
    post.status = "deleted";
    post.updatedAt = Date.now();

    await post.save();

    res.status(200).json({
      message: "Post deleted successfully.",
      post,
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Server error while deleting post." });
  }
};
