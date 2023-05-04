const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: String,
    summary: String,
    content: String,
    blogPicture: String,
    author: String,
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
