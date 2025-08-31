// controllers/postController.js
const Post = require("../models/post");

// Create a new post
module.exports.createPost = async (req, res) => {
  try {
    console.log("Request body received:", req.body);
    const { title, content ,userId } = req.body;

    // Validation for both title and content
    if (!title || title.trim() === "") {
      return res.status(400).json({ 
        success: false,
        message: "Post title is required." 
      });
    }

    if (!content || content.trim() === "") {
      return res.status(400).json({ 
        success: false,
        message: "Post content is required." 
      });
    }

    if (!userId) {
      return res.status(400).json({ 
        success: false,
        message: "User ID is required." 
      });
    }

    const newPost = new Post({
      title: title.trim(),
      content: content.trim(),
      user: userId,
      status: "pending", // new posts are pending admin approval by default
    });

    await newPost.save();

    res.status(201).json({
      success: true,
      message: "Post created successfully and is pending approval.",
      post: newPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error while creating post." 
    });
  }
};

// Get single post by ID
module.exports.getSinglePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId)
      .populate("user", "name email") // populate user info
      .populate("comments"); // populate comments if you have them

    if (!post || post.status === "deleted") {
      return res.status(404).json({ 
        success: false,
        message: "Post not found or has been deleted." 
      });
    }

    // Increment view count
    post.views = (post.views || 0) + 1;
    await post.save();

    res.status(200).json({
      success: true,
      message: "Post fetched successfully",
      post,
    });
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error while fetching post." 
    });
  }
};

// Get all posts with filtering and pagination
module.exports.getPosts = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      status = 'approved', 
      category,
      userId,
      search 
    } = req.query;

    // Build filter object
    const filter = {};
    
    // Filter by status (default to approved for public viewing)
    if (status) {
      filter.status = status;
    }
    
    // Filter by category if provided
    if (category && category !== 'All') {
      filter.category = category;
    }
    
    // Filter by user if provided
    if (userId) {
      filter.user = userId;
    }
    
    // Search in title and content if search term provided
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get posts with pagination
    const posts = await Post.find(filter)
      .populate("user", "name email")
      .sort({ createdAt: -1 }) // Latest first
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const totalPosts = await Post.countDocuments(filter);
    const totalPages = Math.ceil(totalPosts / limit);

    res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      posts,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalPosts,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error while fetching posts." 
    });
  }
};

module.exports.getUserPost = async (req,res,next)=>{
  try {
    const { userId } = req.params;
    console.log(req.params);

    if(!userId){
      return res.status(404).json({
        success : false ,
        message : "userId doesn't found "
      })
    }

    const posts = await Post.find({user : userId})
  
    if (posts.length < 1) {
      return res.status(404).json({ 
        success: false,
        message: "This user doesn't have any Post." 
      });
    }

    console.log(posts)
    res.status(200).json(posts);

  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error while fetching post." 
    });
  }
}

// Get user's own posts (for dashboard)
module.exports.getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10, status } = req.query;

    const filter = { user: userId };
    if (status) {
      filter.status = status;
    }

    const skip = (page - 1) * limit;

    const posts = await Post.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalPosts = await Post.countDocuments(filter);

    res.status(200).json({
      success: true,
      message: "User posts fetched successfully",
      posts,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalPosts / limit),
        totalPosts
      }
    });
  } catch (error) {
    console.error("Error fetching user posts:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error while fetching user posts." 
    });
  }
};

// Update post
module.exports.updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, content, category } = req.body;
    
    // Validation
    if (!title || title.trim() === "") {
      return res.status(400).json({ 
        success: false,
        message: "Post title is required." 
      });
    }

    if (!content || content.trim() === "") {
      return res.status(400).json({ 
        success: false,
        message: "Post content cannot be empty." 
      });
    }

    const post = await Post.findById(postId);

    if (!post || post.status === "deleted") {
      return res.status(404).json({
        success: false,
        message: "Post not found or has been deleted."
      });
    }

    // Authorization check (uncomment when you have auth middleware)
    // if (post.user.toString() !== req.user._id.toString()) {
    //   return res.status(403).json({ 
    //     success: false,
    //     message: 'You are not authorized to update this post.' 
    //   });
    // }

    // Update post fields
    post.title = title.trim();
    post.content = content.trim();
    if (category) post.category = category;
    post.status = 'pending'; // Reset to pending after edit for re-approval

    await post.save();

    res.status(200).json({
      success: true,
      message: "Post updated successfully.",
      post,
    });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error while updating post." 
    });
  }
};

// Delete post (soft delete)
module.exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post || post.status === "deleted") {
      return res.status(404).json({
        success: false,
        message: "Post not found or already deleted."
      });
    }

    // Authorization check (uncomment when you have auth middleware)
    // if (post.user.toString() !== req.user._id.toString()) {
    //   return res.status(403).json({ 
    //     success: false,
    //     message: 'You are not authorized to delete this post.' 
    //   });
    // }

    // Soft delete: mark status as 'deleted'
    post.status = "deleted";
    await post.save();

    res.status(200).json({
      success: true,
      message: "Post deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error while deleting post." 
    });
  }
};

// Get trending posts (based on likes and recent activity)
module.exports.getTrendingPosts = async (req, res) => {
  try {
    const { limit = 5 } = req.query;

    // Get posts from last 7 days, sorted by likes and views
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const trendingPosts = await Post.find({
      status: 'approved',
      createdAt: { $gte: oneWeekAgo }
    })
    .populate("user", "name email")
    .sort({ 
      likes: -1,  // Most liked first
      views: -1,  // Most viewed second
      createdAt: -1 // Most recent third
    })
    .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      message: "Trending posts fetched successfully",
      posts: trendingPosts
    });
  } catch (error) {
    console.error("Error fetching trending posts:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error while fetching trending posts." 
    });
  }
};

// Like/Unlike a post
module.exports.toggleLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body; // In real app, get from auth middleware

    const post = await Post.findById(postId);

    if (!post || post.status !== 'approved') {
      return res.status(404).json({
        success: false,
        message: "Post not found or not approved."
      });
    }

    // Check if user already liked the post
    const likeIndex = post.likes.indexOf(userId);

    if (likeIndex > -1) {
      // Unlike: remove user from likes array
      post.likes.splice(likeIndex, 1);
    } else {
      // Like: add user to likes array
      post.likes.push(userId);
    }

    await post.save();

    res.status(200).json({
      success: true,
      message: likeIndex > -1 ? "Post unliked" : "Post liked",
      likesCount: post.likes.length,
      isLiked: likeIndex === -1
    });
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error while toggling like." 
    });
  }
};