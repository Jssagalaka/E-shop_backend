const authController = require("../controller/auth.controller");
const express = require("express");
const router = express.Router();

router.post("/signup", authController.register);
router.post("/login", authController.login);

module.exports = router;
