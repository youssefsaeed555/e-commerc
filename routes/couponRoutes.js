const express = require("express");

const routes = express.Router();
const {
  validateDeletCoupon,
  validateUpdateCoupon,
  checkCouponId,
  createCouponValidate,
} = require("../utils/validators/coupon_validator");
const {
  getCoupon,
  getCoupons,
  deleteCoupons,
  addCoupons,
  updateCoupons,
} = require("../services/coupon_services");

const { protect, isAllowedTo } = require("../services/auth_services");

routes.use(protect, isAllowedTo("admin", "manger"));

routes.route("/").get(getCoupons).post(createCouponValidate, addCoupons);

routes
  .route("/:id")
  .get(checkCouponId, getCoupon)
  .put(validateUpdateCoupon, updateCoupons)
  .delete(validateDeletCoupon, deleteCoupons);

module.exports = routes;
