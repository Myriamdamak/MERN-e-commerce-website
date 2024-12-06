const express = require("express");
const orderRoute = express.Router();
const {
  getOrders,
  postOrder,
  getOneOrder,
  updateOrderPayment,
} = require("../Controllers/orderController");
const isAuth = require("../middleware/isAuth.js");
const isAutho = require("../middleware/isAutho.js");
orderRoute.get("/orders/:id", getOneOrder);
orderRoute.put("/orders/:id/payment", updateOrderPayment);
orderRoute.get("/orders", isAuth,isAutho(["user","admin"]),getOrders);
orderRoute.post("/orders", isAuth,isAutho(["user","admin"]),postOrder);

module.exports = orderRoute;
