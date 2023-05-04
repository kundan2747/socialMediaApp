const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { login, refresh, logout } = require("../controller/authController");

router.post("/", login);
router.get("/refresh", refresh);
router.post("/logout", logout);

module.exports = router;
