const express = require("express");
const router = express.Router();
const userModel = require("../Models/userModel");
const mongoose = require("mongoose");

// Middleware to validate ObjectId
const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  if (id && !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }
  next();
};

// * Get all users
router.get("/", async (req, res) => {
  try {
    const users = await userModel.find();
    return res.status(200).json(users);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

// * Get one user
router.get("/:id", validateObjectId, async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// * Create one user
router.post("/", async (req, res) => {
  const { name, email, phone, status } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: "Name, Email, and Phone are required" });
  }

  const user = new userModel({
    name,
    email,
    phone,
    status: status || "Inactive",
    shoppingCart: [],
  });

  try {
    const newUser = await user.save();
    return res.status(201).json(newUser);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

// * Update one user
router.put("/:id", validateObjectId, async (req, res) => {
  const { name, email, phone, status } = req.body;

  try {
    const user = await userModel.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, status },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ user, msg: "User updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
module.exports = router;
