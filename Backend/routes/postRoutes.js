const express = require("express");
const router = express.Router();
const postController = require("../controller/postControllers");


router.post("/create", postController.createPost);
router.get("/read/:postId", postController.getSinglePost);
router.get("/", postController.getPosts);  // This makes GET /post work
router.post("/read/:userId" , postController.getUserPost)
router.get("/read", postController.getPosts); // Keep this too for compatibility
router.put("/update/:postId", postController.updatePost); 
router.delete("/delete/:postId", postController.deletePost);


router.get("/trending", postController.getTrendingPosts);
router.get("/user/:userId", postController.getUserPosts); // Get posts by specific user
router.post("/:postId/like", postController.toggleLike); // Like/unlike post


module.exports = router;

/*
ROUTE STRUCTURE CHECK:
Make sure in your main app.js you have:
app.use('/post', postRoutes); // This makes routes accessible as /post/create, /post/read, etc.

OR if you want different structure:
app.use('/api/posts', postRoutes); // This makes routes /api/posts/create, /api/posts/read, etc.

Make sure your frontend API calls match this structure!
*/