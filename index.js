const express = require("express");
var cors = require("cors");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3005; 
const app = express();
const config = require("./service/config");
const { connectDb } = require("./service/db");

app.use(cors());
require("./service/routes")(app);



mongoose
  .connect("mongodb://localhost:27017/gitapp", { useNewUrlParser: true })
  .then(() => {
    console.log("db connected");
    app.listen(config.PORT, () => {
      console.log(`Connected to port ${PORT}`);
    });
  }).catch((err)=>{});


