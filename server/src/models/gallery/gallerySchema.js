const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Galleryschema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      // required: true,
      trim: true,
    },
    // detail: {
    //   type: String,
    //   trim: true,
    // },
    event: [
      {
        eventTitle: {
          type: String,
          trim: true,
        },
        eventDetails: {
          type: String,
          trim: true,
        },
        image: [
          {
            type: String,
          },
        ],
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const GallerySchema = mongoose.model("gallery", Galleryschema);

module.exports = { GallerySchema };
