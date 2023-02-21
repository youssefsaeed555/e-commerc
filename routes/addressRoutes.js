const express = require("express");

const routes = express.Router();

const {
  addAddress,
  deleteAddress,
  getLoggedUserAddress,
} = require("../services/address_services");

const { protect, isAllowedTo } = require("../services/auth_services");

routes.use(protect, isAllowedTo("user"));

routes.route("/").post(addAddress).get(getLoggedUserAddress);

routes.delete("/:addressId", deleteAddress);

module.exports = routes;
