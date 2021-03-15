const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../service/config");
const UserSchema = new mongoose.Schema(
  {
    login: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    avatar_url: {
      type:String
    },
    bio: {
      type:String
    },
    name: {
      type:String
    },
    email: {
      type:String
    },
    followers: {
      type:Number
    },
    following: {
      type:Number
    },
    public_repos:{
      type:Number
    },
    repos_url: {
      type:String
    },
    mylist: {
      type:Array
    }
  },
  { timestamps: true }
);

UserSchema.method("generateAuthToken", async function () {
  const user = this;
  const token = jwt.sign(
    { id: user._id, username: user.login },
    config.JWT_SECRET
  );
  return token;
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
