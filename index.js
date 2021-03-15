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
  .connect("mongodb+srv://priyam1103:priyam7035@cluster0.gfdwh.mongodb.net/myFirst?retryWrites=true&w=majority", { useNewUrlParser: true })
  .then(() => {
    console.log("db connected");
    app.listen(PORT, () => {
      console.log(`Connected to port ${PORT}`);
    });
  }).catch((err)=>{});


