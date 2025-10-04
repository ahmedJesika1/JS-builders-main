const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DevelopmentProcessschema = new Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    details: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const DevelopmentProcessSchema = mongoose.model(
  "developmentProcess",
  DevelopmentProcessschema
);

module.exports = { DevelopmentProcessSchema };
