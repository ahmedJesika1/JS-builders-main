const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Blogschema = new Schema(
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
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const BlogSchema = mongoose.model("blog", Blogschema);

module.exports = { BlogSchema };
