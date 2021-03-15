const mongoose = require("mongoose");

const SavedUserSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    username: {
      type: String,
    },
    avatar_url: {
      type: String,
    },
    bio: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    followers: {
      type: Number,
    },
    following: {
      type: Number,
    },
    public_repos: {
      type: Number,
    },
    repos_url: {
      type: String,
    },
  },
  { timestamps: true }
);

const SavedUser = mongoose.model("SavedUser", SavedUserSchema);
module.exports = SavedUser;
