const express = require("express");
const productRoute = express.Router();
const {
  getProducts,
  postProduct,
  putProduct,
  deleteProduct,
  getOneProduct,
  addReview,
} = require("../Controllers/productController");

const isAutho = require("../middleware/isAutho.js");
productRoute.get("/products", getProducts);
productRoute.get("/products/:id", getOneProduct);
productRoute.post("/products", isAutho(["admin"]), postProduct);
productRoute.put("/products/:id", isAutho(["admin"]), putProduct);
productRoute.delete("/products/:id", isAutho(["admin"]), deleteProduct);
productRoute.post(
  "/products/:id/review",
  isAutho(["user", "admin"]),
  addReview
);

module.exports = productRoute;
