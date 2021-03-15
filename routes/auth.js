const express = require("express");
const route = express.Router();
const {
  signUp,
  SignIn,
  me,
  addToList,
  removeFromList,
  mylist
} = require("../handlers/auth");
const auth = require("../middleware/auth");

route.post("/signup", signUp);
route.post("/login", SignIn);
route.get("/me", auth, me);
route.post("/addtolist", auth, addToList)
route.post("/removefromlist/:remove_id", auth, removeFromList)
route.get("/mylist",auth,mylist)

module.exports = route;
