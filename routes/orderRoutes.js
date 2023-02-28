const express = require("express");

const routes = express.Router();
const {
  createOrder,
  getAllOrders,
  getLoggedUserOrders,
  getOrder,
  updateOrderDelivered,
  updateOrderPaid,
  checkOutSession,
} = require("../services/orderServices");

const { protect, isAllowedTo } = require("../services/auth_services");

routes.use(protect);

routes
  .route("/checkout-session/:cartId")
  .get(isAllowedTo("user"), checkOutSession);

routes
  .route("/")
  .get(
    getLoggedUserOrders,
    isAllowedTo("user", "admin", "manger"),
    getAllOrders
  );

routes.route("/:id").get(isAllowedTo("user"), getOrder);

routes.route("/:cartId").post(isAllowedTo("user"), createOrder);

routes
  .route("/:orderId/pay")
  .put(isAllowedTo("admin", "manger"), updateOrderPaid);

routes
  .route("/:orderId/deliver")
  .put(isAllowedTo("admin", "manger"), updateOrderDelivered);

module.exports = routes;
