const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Bannerschema = new Schema(
  {
    image: {
      type: String,
    },
    type: {
      type: String,
      enum: ["MAIN", "HEAD"],
      default: "MAIN",
    },
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

const BannerSchema = mongoose.model("banner", Bannerschema);

module.exports = { BannerSchema };
