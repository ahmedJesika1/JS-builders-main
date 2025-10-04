const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Contactschema = new Schema(
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
    productID : {  
      type: String
    }, 
    visitDate: {
      type: Date,
    },
     visitTime: {
      type: String,
    },
    message: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["client", "user"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const ContactSchema = mongoose.model("contact", Contactschema);

module.exports = { ContactSchema };
