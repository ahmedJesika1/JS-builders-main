const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AboutUsschema = new Schema(
  {
    image: {
      type: String,
    },
    title: {
      type: String,
      trim: true,
    },
    details: {
      type: String,
      trim: true,
    },
    mission: {
      type: String,
      trim: true,
    },
    vision: {
      type: String,
      trim: true,
    },
    value: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const AboutUsSchema = mongoose.model("aboutUs", AboutUsschema);

module.exports = { AboutUsSchema };
