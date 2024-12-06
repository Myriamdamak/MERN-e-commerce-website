const express = require("express");
const userRoute = express.Router();
const {
  getUsers,
  postUser,
  putUser,
  deleteUser,
  getOneUser,
} = require("../Controllers/userController");
const { signIn } = require("../Controllers/authController");
const isAuth = require("../middleware/isAuth.js");
const isAutho = require("../middleware/isAutho.js");
userRoute.get("/users", getUsers);
userRoute.get("/users/:id", isAuth, isAutho(["user","admin"]), getOneUser);
userRoute.post("/users", postUser);
userRoute.put("/users/:id", putUser);
userRoute.delete("/users/:id", isAuth, isAutho(["admin"]), deleteUser);
userRoute.post("/login", signIn);
module.exports = userRoute;
