const express = require("express");

const routes = express.Router();

const {
  addProductToCart,
  getLoggedUser,
  deleteFromCart,
  clearAll,
  updateQuantity,
  applyCoupon,
} = require("../services/cart_services");

const { protect, isAllowedTo } = require("../services/auth_services");

routes.use(protect, isAllowedTo("user"));

routes.route("/").post(addProductToCart).get(getLoggedUser).delete(clearAll);

routes.route("/applyCoupon").put(applyCoupon);

routes.route("/:cartItemId").delete(deleteFromCart).put(updateQuantity);

module.exports = routes;
