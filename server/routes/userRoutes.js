const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const verifyJWT = require("../middleware/verifyJWT");

const {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
} = require("../controller/userController");

// router.use(verifyJWT);

router.get("/", getAllUsers);
router.post("/", createNewUser);
router.patch("/", updateUser);
router.delete("/", deleteUser);

module.exports = router;
