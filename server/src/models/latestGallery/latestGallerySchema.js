const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LatestGalleryschema = new Schema(
  {
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

const LatestGallerySchema = mongoose.model(
  "latestGallery",
  LatestGalleryschema
);

module.exports = { LatestGallerySchema };
