const express = require("express");

const routes = express.Router();
const {
  checkBrandId,
  createBrandValidate,
  validateDeleteBrand,
  validateUpdateBrand,
} = require("../utils/validators/brand_validator");
const {
  getBrand,
  getbrands,
  addBrand,
  updateBrand,
  deleteBrand,
  uploadSingle,
  resize,
} = require("../services/brands");

//const subCateogry = require('./sub_category')

//deal with subcategories for spesfic category
//routes.use('/:brandId/subCategory', subCateogry)
const { protect, isAllowedTo } = require("../services/auth_services");

routes
  .route("/")
  .get(getbrands)
  .post(
    protect,
    isAllowedTo("admin", "manger"),
    uploadSingle,
    resize,
    createBrandValidate,
    addBrand
  );

routes
  .route("/:id")
  .get(checkBrandId, getBrand)
  .put(
    protect,
    isAllowedTo("admin", "manger"),
    uploadSingle,
    resize,
    validateUpdateBrand,
    updateBrand
  )
  .delete(protect, isAllowedTo("admin"), validateDeleteBrand, deleteBrand);

module.exports = routes;
