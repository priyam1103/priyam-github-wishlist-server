const express = require("express");
var cors = require("cors");

const PORT = process.env.PORT || 3005; 
const app = express();
const config = require("./service/config");
const { connectDb } = require("./service/db");

app.use(cors());
require("./service/routes")(app);



connectDb().then(() => {
  app.listen(config.PORT, () => {
    console.log(`Connected to port ${config.PORT}`);
  });
}).catch((err)=>{});


