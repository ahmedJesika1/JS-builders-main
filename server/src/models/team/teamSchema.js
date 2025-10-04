const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Teamschema = new Schema(
  {
    image: {
      type: String,
    },
    name: {
      type: String,
      trim: true,
    },
    designation: {
      type: String,
      trim: true,
    },
    details: {
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

const TeamSchema = mongoose.model("team", Teamschema);

module.exports = { TeamSchema };
