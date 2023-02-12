const express = require("express");

const routes = express.Router({ mergeParams: true });
const {
  createReviewValidate,
  validateUpdateReview,
  validateDeleteReview,
  checkReview,
} = require("../utils/validators/reviews_validator");
const {
  getReview,
  addReview,
  deleteReview,
  updateReview,
  getReviews,
  setParamsOfProduct,
  setProductAndUserBody,
} = require("../services/reviwes_services");

const { protect, isAllowedTo } = require("../services/auth_services");

routes
  .route("/")
  .get(setParamsOfProduct, getReviews)
  .post(
    protect,
    isAllowedTo("user"),
    setProductAndUserBody,
    createReviewValidate,
    addReview
  );

routes
  .route("/:id")
  .get(checkReview, getReview)
  .put(protect, validateUpdateReview, isAllowedTo("user"), updateReview)
  .delete(
    protect,
    isAllowedTo("admin", "user", "manger"),
    validateDeleteReview,
    deleteReview
  );

module.exports = routes;
