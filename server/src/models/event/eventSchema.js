const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Eventschema = new Schema(
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
    location: {
      type: String,
      trim: true,
    },
    date: {
      type: String,
      trim: true,
    },
    time: {
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

const EventSchema = mongoose.model("event", Eventschema);

module.exports = { EventSchema };
