const express = require('express');
const router = express.Router();
const adminController= require('../controller/adminPostController');
// const { isAdmin, protect } = require('../middleware/authMiddleware'); // your auth middlewares
//  protect, isAdmin,
router.get('/posts/:postId',adminController.updatePostStatus);

module.exports = router;
