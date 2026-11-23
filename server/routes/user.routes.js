const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const User = require("../models/User.model");
const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/:id", isAuthenticated, async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid user id" });
  }

  try {
    const user = await User.findById(req.params.id).select("name email");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
