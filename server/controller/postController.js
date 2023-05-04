const Post = require("../models/Post.js");
const User = require("../models/User.js");

const createPost = async (req, res) => {
  try {
    const { title, summary, blogPicture, content } = req.body;
    let loggedInUser = req.user;
    const user = await User.findById(loggedInUser.id);
    const newPost = new Post({
      title,
      summary,
      content,
      blogPicture,
      author: user.firstName,
    });
    await newPost.save();

    res.status(201).json(newPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ author: userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = { getFeedPosts, getUserPosts, likePost, createPost };
