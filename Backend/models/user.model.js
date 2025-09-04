const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be atleast 3 characters long"],
    },
    lastname: {
      type: String,
      minlength: [3, "Last name must be atleast 3 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: [6, "password must be atleast 6 characters long"],
  },
  verifyOtp: {
    type: String,
    default: "",
  },
  verifyOtpExpireAt: {
    type: Number,
    default: 0,
  },
  resetOtp: {
    type: String,
    default: "",
  },
  resetOtpExpireAt: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    enum: ["user", "admin", "moderator"],
    default: "user",
  },

  adminPermissions: {
    type: [String],
    default: [],
    enum: ["manage_posts", "manage_users", "view_analytics", "system_settings"],
  },

  roleUpdatedAt: Date,
  roleUpdatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// function for generating token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id ,role: this.role  }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

// function for comparing password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// hash password
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

module.exports = userModel;
