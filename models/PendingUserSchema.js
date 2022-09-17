const mongoose = require("mongoose");
const PendingUserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [15, "Name is too large"],
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: [true, "Name must be unique"],
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [12, "Name is too large"],
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: [true, "Name must be unique"],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: {
        values: ["user", "admin"],
        message: "Role value can't be {VALUE}, must be user/admin",
      },
    },
    education: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    linkeDin: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PendingUser", PendingUserSchema);
