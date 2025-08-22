const userModel = require('../models/user.model.js');
const { validationResult } = require('express-validator');
const userService = require('../services/user.services.js');
const transporter = require('../config/nodemailer.js');
const blacklistTokenModel = require('../models/blacklistToken.model.js');

const otpStore = {};

// REGISTER USER (after OTP verified)
module.exports.registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }

    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
      return res.status(400).json({ success:false, message:"fullname, email and password are required" });
    }

    // 1) Email already taken? → stop here
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success:false, message:"User already exists" });
    }

    // 2) OTP must be verified for this email
    if (otpStore[email]?.verified !== true) {
      return res.status(400).json({ success:false, message:"OTP not verified. Please verify OTP before registering." });
    }
    delete otpStore[email]; // cleanup once registering

    const hashedPassword = await userModel.hashPassword(password);
    const userData = typeof fullname === 'object'
      ? { firstname: fullname.firstname, lastname: fullname.lastname, email, password: hashedPassword, isAccountVerified: true }
      : { fullname, email, password: hashedPassword, isAccountVerified: true };

    const user = await userService.createUser(userData);
    const token = user.generateAuthToken();

    return res.status(201).json({
      success:true,
      message:"User registered successfully",
      token,
      user: {
        id:user._id, firstname:user.firstname, lastname:user.lastname, fullname:user.fullname,
        email:user.email, isAccountVerified:user.isAccountVerified, createdAt:user.createdAt
      }
    });
  } catch (error) {
    console.error("Register error:", error.message);
    return res.status(500).json({ success:false, message:"Internal server error" });
  }
};

// 📌 OTP Sending for Signup (User not in DB yet)
module.exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success:false, message:"Email is required" });

    // Do not send OTP if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) return res.status(409).json({ success:false, message:"User with this email already exists" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = { otp, expiresAt: Date.now() + 5*60*1000, verified:false };

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Account Verification OTP",
      html: `<p>Your OTP is <b>${otp}</b>. Valid for 5 minutes.</p>`
    });

    return res.status(200).json({ success:true, message:`OTP sent to ${email}`, email });
  } catch (err) {
    console.error("Send OTP Error:", err.message);
    return res.status(500).json({ success:false, message:"Internal server error" });
  }
};


// 📌 Verify OTP during Signup

module.exports.verifyOtp = async (req, res) => {
    try {
        // ✅ Check validation errors from express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: errors.array()
            });
        }

        const { email, otp } = req.body;

        const otpData = otpStore[email];
        if (!otpData) {
            return res.status(400).json({ success: false, message: "No OTP requested for this email" });
        }

        if (otpData.expiresAt < Date.now()) {
            delete otpStore[email];
            return res.status(400).json({ success: false, message: "OTP expired" });
        }

        if (otpData.otp !== otp) {
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }

        // ✅ Mark OTP as verified
        otpStore[email].verified = true;

        return res.status(200).json({ success: true, message: "OTP verified successfully" });

    } catch (err) {
        console.error("Verify OTP Error:", err.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// RESEND OTP
module.exports.resendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        if (!otpStore[email]) {
            return res.status(400).json({ success: false, message: "No OTP request found for this email" });
        }

        // Generate new OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        otpStore[email] = {
            otp,
            expiresAt: Date.now() + 5 * 60 * 1000,
            verified: false
        };

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Resend OTP - Account Verification",
            html: `<p>Your new OTP is <b>${otp}</b>. Valid for 5 minutes.</p>`
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ success: true, message: "OTP resent successfully", email });
    } catch (err) {
        console.error("Resend OTP Error:", err.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};


// LOGIN - Only allow verified users
module.exports.login = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        const { email, password } = req.body;

        // Find user by email
        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Generate authentication token
        const token = user.generateAuthToken();

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                fullname: user.fullname,
                email: user.email,
                isAccountVerified: user.isAccountVerified,
                createdAt: user.createdAt
            }
        });

    } catch (error) {
        console.error('Login error:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            ...(process.env.NODE_ENV === 'development' && { error: error.message })
        });
    }
};

// GET USER PROFILE
module.exports.getUserProfile = async (req, res, next) => {
    try {
        return res.status(200).json({
            success: true,
            user: req.user
        });
    } catch (error) {
        console.error('Get profile error:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Error fetching user profile'
        });
    }
};

//Sending OTP for reseting the password
module.exports.sendResetOtp = async(req,res,next) =>{
    const {email} = req.body;

    if(!email){
        return res.json({success : false , message : 'Email is required'});
    }

    try {
        
        const user  = await userModel.findOne({email});
        if(!user){
            return res.json({success : false , message : 'User not found'});
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.resetOtp = otp;

        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000

        await user.save();

        const mailOption = {
            from : process.env.SENDER_EMAIL,
            to : user.email,
            subject : 'Password Reset OTP',
            text : `Your OTP for resetting your password is${otp}.use this OTP to proceed with resetting your password.`,
            
        }

        await transporter.sendMail(mailOption);

        return res.json({success : true , message : 'OTP sent to your email'});

    } catch (error) {
        return res.json({success : false , message : error.message});
    }
}

// Reset User Password (We need otp , email and new password)
module.exports.resetPassword = async(req,res,next) => {
    try {
        const {email ,otp , newPassword} = req.body;
        
        if(!email || !otp || !newPassword){
            return res.json({success : false , message : 'Email ,OTP and new Password are required '});
        }

        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success : false , message : 'User not found'})
        }

        if(user.resetOtp === "" || user.resetOtp !== otp){
            return res.json({success : false , message : "Invalid OTP"});
        }

        if(user.resetOtpExpireAt < Date.now()){
            return res.json({success : false , message : 'OTP expired'});
        }

        const hashedPassword = await userModel.hashPassword(newPassword);

        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;

        await user.save();

return res.json({ success: true, message: 'Password has been reset Successfully' });

        

    } catch (error) {
        return res.json({success : false , message : error.message});
    }

}

// LOGOUT USER
module.exports.logoutUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'No token found'
            });
        }
        
        // Add token to blacklist
        await blacklistTokenModel.create({ token });

        // Clear cookie
        res.clearCookie('token');
        
        return res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });

    } catch (error) {
        console.error('Logout error:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Error logging out'
        });
    }
};