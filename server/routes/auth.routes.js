const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User.model");
const isAuthenticated = require("../middleware/isAuthenticated");

router.post("/signup", async (req, res, next) => {
  const { email, password, name } = req.body || {};

  if (typeof email !== "string" || typeof password !== "string" || typeof name !== "string" ||
      !email.trim() || !name.trim() || !password) {
    return res.status(400).json({ message: "Email, password and name are required" });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ message: "Please provide a valid email address" });
  }

  if (password.length < 8 || Buffer.byteLength(password, "utf8") > 72) {
    return res.status(400).json({ message: "Password must be at least 8 characters and at most 72 bytes" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, name });
    res.status(201).json({ _id: user._id, email: user.email, name: user.name });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email is already registered" });
    }
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body || {};

  if (typeof email !== "string" || typeof password !== "string" || !email.trim() || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user || Buffer.byteLength(password, "utf8") > 72 || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const payload = { _id: user._id, email: user.email, name: user.name };
    const authToken = jwt.sign(payload, process.env.JWT_SECRET, { algorithm: "HS256", expiresIn: "6h" });
    res.json({ authToken });
  } catch (error) {
    next(error);
  }
});

router.get("/verify", isAuthenticated, (req, res) => {
  res.json(req.payload);
});

module.exports = router;
