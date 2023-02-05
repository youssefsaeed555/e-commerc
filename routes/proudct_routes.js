const express = require("express");

const routes = express.Router();
const {
  getProudctId,
  createProuct,
  validateUpdatePRoudct,
  validateDeletePRoudct,
} = require("../utils/validators/proudct_validate");

const { protect, isAllowedTo } = require("../services/auth_services");

const {
  getProudct,
  getProudcts,
  addProudct,
  updateProudctId,
  deleteProudctId,
  uploadImage,
  resize,
} = require("../services/proudct");

routes
  .route("/")
  .get(getProudcts)
  .post(
    protect,
    isAllowedTo("admin", "manger"),
    uploadImage,
    resize,
    createProuct,
    addProudct
  );

routes
  .route("/:id")
  .get(getProudctId, getProudct)
  .put(
    protect,
    isAllowedTo("admin", "manger"),
    uploadImage,
    resize,
    validateUpdatePRoudct,
    updateProudctId
  )
  .delete(
    protect,
    isAllowedTo("admin"),
    validateDeletePRoudct,
    deleteProudctId
  );

module.exports = routes;
