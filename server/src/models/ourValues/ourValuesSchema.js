const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OurValuesschema = new Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    details: {
      type: String,
      trim: true,
    },
    info: [
      {
        title: {
          type: String,
          // required: true,
          trim: true,
        },
        count: {
          type: Number,
          default: 0,
          min: 0,
        },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const OurValuesSchema = mongoose.model("ourValues", OurValuesschema);

module.exports = { OurValuesSchema };
