const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controller/user.controller.js');
const authMiddleware = require('../middleware/auth.middleware.js');

// Register user route
router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
],
    userController.registerUser
);

// route for sending the otp
router.post('/sendOtp' , userController.sendOtp);

//  OTP Verification route (Step 2 of OTP flow: Verifies account, but does not log in)
router.post('/verifyOtp', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits')
],
    userController.verifyOtp
);

// resend OTP route
router.post('/resend-otp' , userController.resendOtp);

// Login route (Step 1 of OTP flow: Sends OTP if not verified)
router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    userController.login
);

// Get user profile (Only for logged-in users)
router.get('/profile', authMiddleware.authUser, userController.getUserProfile);

// Logout route
router.post('/logout', authMiddleware.authUser, userController.logoutUser);

// Sending OTP for password reset
router.post('/send-reset-otp' , userController.sendResetOtp);

router.post('/reset-password' , userController.resetPassword);


module.exports = router;
