const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Serviceschema = new Schema(
  {
     productID: {
      type: String,
      default: () => `PROD-${Date.now()}`,
      unique: true,
    },
    category: {
      type: String,
      enum: ["land", "apartment"],
    },
    images: [{ type: String }],
    youtubeLink: { type: String },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    details: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    amenities: [
      {
        type: Schema.Types.ObjectId,
        ref: "Amenity",
      },
    ],
    featuredItems: [
      {
        item: { type: Schema.Types.ObjectId, ref: "Featured" },
        quantity: { type: Number, default: 1 },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ["delivered", "running", "upcoming"],
    },
  },
  { timestamps: true }
);

const ServiceSchema = mongoose.model("service", Serviceschema);

module.exports = { ServiceSchema };
