const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Videoschema = new Schema(
  {
    url: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const VideoSchema = mongoose.model("video", Videoschema);

module.exports = { VideoSchema };
