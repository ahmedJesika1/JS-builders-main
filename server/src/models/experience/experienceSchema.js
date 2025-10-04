const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Experienceschema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      // required: true,
      trim: true,
    },
    detail: {
      type: String,
      trim: true,
    },
    pdf: {
      type: String,
    },
    quote: {
      type: String,
      trim: true,
    },
    honorName: {
      type: String,
      trim: true,
    },
    honorDesignation: {
      type: String,
      trim: true,
    },
    image1: {
      type: String,
    },
    image2: {
      type: String,
    },
    video: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const ExperienceSchema = mongoose.model("Experience", Experienceschema);

module.exports = { ExperienceSchema };
