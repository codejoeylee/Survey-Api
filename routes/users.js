const express = require("express");
const { registerUser, loginUser } = require("../controller/user");
const { registerRules, loginRules } = require("../middleware/validation");
const validateRequest = require("../middleware/validateRequest");

const router = express.Router();

router.post("/register", ...registerRules, validateRequest, registerUser);
router.post("/login", ...loginRules, validateRequest, loginUser);

module.exports = router;
