const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Careerschema = new Schema(
  {
    title: {
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

const CareerSchema = mongoose.model("career", Careerschema);

module.exports = { CareerSchema };
