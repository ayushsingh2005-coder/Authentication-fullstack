const express = require("express");
const router = express.Router();
const postController = require("../controller/postControllers");



router.post("/create" ,postController.createPost);
router.get("/read/:postId" , postController.getSinglePost);
router.post("/update/:postId" , postController.updatePost);
router.delete("/delete/:postId" , postController.deletePost);


module.exports = router;