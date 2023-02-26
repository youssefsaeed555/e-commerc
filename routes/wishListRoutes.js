const express = require("express");

const routes = express.Router();

const {
  addToWishlist,
  removeFromWishlist,
  getWishListLoggedUser,
} = require("../services/wishList");

const { protect, isAllowedTo } = require("../services/auth_services");

routes.use(protect, isAllowedTo("user"));

routes.route("/").post(addToWishlist).get(getWishListLoggedUser);

routes.delete("/:productId", removeFromWishlist);

module.exports = routes;
