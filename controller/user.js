const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, firstName, lastName } = req.body;

  const existing = await User.findOne({ $or: [{ email }, { username }] });
  if (existing) {
    res.status(400);
    throw new Error("Username or email already exists");
  }

  const user = new User({ username, email, password, firstName, lastName });
  await user.save();

  res.status(201).json({ message: "User registered", userId: user._id });
});

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const isMatch = await await user.comparePassword(password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  res.status(200).json({
    message: "Login successful",
    userId: user._id,
    username: user.username,
  });
});
