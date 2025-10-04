const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AmenitySchema = new Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Amenity", AmenitySchema);
