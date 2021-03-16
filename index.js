const express = require("express");
var cors = require("cors");

const PORT = process.env.PORT || 3005; 
const app = express();
const { connectDb } = require("./service/db");

app.use(cors());
require("./service/routes")(app);


connectDb()
  .then(() => {
    console.log("db connected");
    app.listen(PORT, () => {
      console.log(`Connected to port ${PORT}`);
    });
  }).catch((err)=>{});


