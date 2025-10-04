const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const validator = require("validator");

const Schema = mongoose.Schema;

const Userschema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name"],
      minLength: [3, "Minimum length of name is 3 characters"],
      maxLength: [50, "Maximum length of name is 50 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email address"],
      validate: {
        validator: (val) => validator.isEmail(val),
        message: "Please provide a valid email address",
      },
      lowercase: true,
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      validate: {
        validator: (val) => /^(?:\+8801[3-9]\d{8}|01[3-9]\d{8})$/.test(val),
        message: "Please provide a valid phone number",
      },
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 25,
      select: false,
    },
    confirmPassword: {
      type: String,
      required: true,
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "Passwords do not match",
      },
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    // verified: {
    //   type: Boolean,
    //   default: false,
    // },
    verificationToken: String,
    verificationTokenExpires: String,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,

  },
  { timestamps: true }
);

// Hash password before saving
Userschema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = undefined;
  next();
});

// Set passwordChangedAt field
Userschema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// Exclude inactive users from queries
Userschema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

// Methods
Userschema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

Userschema.methods.changedPasswordAfter = function (JWTIssuedTime) {
  if (this.passwordChangedAt) {
    return (
      JWTIssuedTime < parseInt(this.passwordChangedAt.getTime() / 1000, 10)
    );
  }
  return false;
};

Userschema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const UserSchema = mongoose.model("user", Userschema);

module.exports = { UserSchema };
