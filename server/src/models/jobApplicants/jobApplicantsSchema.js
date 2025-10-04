const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobApplicantschema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    pdf: {
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

const JobApplicantSchema = mongoose.model("jobApplicant", JobApplicantschema);

module.exports = { JobApplicantSchema };
