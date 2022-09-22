const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const userSchema = mongoose.Schema(
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
    bio: {
      type: String,
      required: true,
      trim: true,
      minLength: [15, "Bio must be at least 15 characters."],
      maxLength: [70, "bio  is too large"],
    },
    personalSite: {
      type: String,
      required: true,
      trim: true,
    },
    AccountAccess: {
      type: String,
      enum: ["freeUser", "proUser"],
    },
    socialAccount: [{ username: String }],

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
    tools: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Tools",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
