// featuredSchema.js

const mongoose = require("mongoose");

const featuredSchema = new mongoose.Schema({
  label: { type: String, required: true },
  image: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Featured", featuredSchema);
