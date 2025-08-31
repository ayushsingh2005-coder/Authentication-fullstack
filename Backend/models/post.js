const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 300,
  },
  user: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'User',
    type: String,
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "deleted"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  category: {
    type: String,
    default: "General",
    enum: ["Frontend", "Backend", "AI/ML", "DevOps", "Mobile", "General"],
  },
  views: {
    type: Number,
    default: 0,
  },
  tags: [
    {
      type: String,
    },
  ],
});

// Auto-update `updatedAt` on save
postSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Post", postSchema);
