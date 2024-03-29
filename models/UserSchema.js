const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: [5, "Name must be at least 5 characters."],
      maxLength: [15, "Name is too large"],
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: [true, "Your Username must be unique"],
      minLength: [5, "Name must be at least 5 characters."],
      maxLength: [15, "Your User name  is too large"],
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: [true, "Your Email is already used"],
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
    follor: [
      {
        type: mongoose.Types.ObjectId,
      },
    ],
    bookmark: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Bookmark",
      },
    ],
    card: [
      {
        type: mongoose.Types.ObjectId,
      },
    ],
    myProduct: [
      {
        type: mongoose.Types.ObjectId,
      },
    ],
    myProductOrder: [
      {
        type: mongoose.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
