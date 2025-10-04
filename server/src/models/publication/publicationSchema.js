const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Publicationschema = new Schema(
  {
    image: {
      type: String,
    },
    author: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    details: {
      type: String,
      trim: true,
    },
    link: {
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

const PublicationSchema = mongoose.model("publication", Publicationschema);

module.exports = { PublicationSchema };
