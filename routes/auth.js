// routes/auth.js
const express = require("express");
const {
    getGoogleRedirect,
    handleGoogleCallback,
    logout
} = require("../controller/auth");
const router = express.Router();


router.get("/google", getGoogleRedirect);

router.get("/google/callback", handleGoogleCallback);

router.post("/logout", logout);



module.exports = router;

