const dotenv = require("dotenv").config();

const { parsed } = dotenv;

const {
  MONGODB_URI,
  JWT_SECRET,
  GIT_CLIENT_ID,
  GIT_SECRET_KEY
} = process.env;

const config = {
  MONGODB_URI: MONGODB_URI,
  JWT_SECRET: JWT_SECRET,
  GIT_CLIENT_ID: GIT_CLIENT_ID,
  GIT_SECRET_KEY:GIT_SECRET_KEY,
  DEV_ENV: false,
};
module.exports = config;
