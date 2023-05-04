const express = require("express");
const { getFeedPosts, getUserPosts } = require("../controller/postController");
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();

router.get("/", verifyJWT, getFeedPosts);
router.get("/:userId", verifyJWT, getUserPosts);

// add a route to update a post.

module.exports = router;
