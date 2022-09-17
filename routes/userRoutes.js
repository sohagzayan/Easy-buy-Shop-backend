const express = require("express");
const {
  unShiptUser,
  getAllUser,
  deleteUser,
  getSingleUser,
  createNewUser,
  loginUser,
  verifyUser,
  currentUser,
} = require("../controllers/userController");
const userRoute = express.Router();

const authToken = require("../middlWare/authToken");

userRoute.put("/:email", unShiptUser);
userRoute.delete("/:id", deleteUser);
userRoute.get("/", getAllUser);
userRoute.post("/signup", createNewUser);
userRoute.get("/verifyuser/:id", verifyUser);
userRoute.get("/currentuser/:id", currentUser);
userRoute.post("/login", loginUser);
userRoute.get("/:email", getSingleUser);

module.exports = userRoute;
