const express = require("express");

const {
  createSubCategoryValidate,
  checkSubCategoryId,
  validateUpdateSubCategory,
  validateDeleteSubCategory,
} = require("../utils/validators/subCategory_validator");

const {
  createSubCategory,
  getsubCategories,
  getsubCategoryId,
  updateSubCategoryId,
  deleteSubCategoryId,
  createSubOfCategory,
} = require("../services/sub_category");
const { protect } = require("../services/auth_services");

const routes = express.Router({ mergeParams: true });
//we need to acess params but from parent route

routes
  .route("/")
  .get(protect, getsubCategories)
  .post(createSubOfCategory, createSubCategoryValidate, createSubCategory);

routes
  .route("/:id")
  .get(checkSubCategoryId, getsubCategoryId)
  .put(validateUpdateSubCategory, updateSubCategoryId)
  .delete(validateDeleteSubCategory, deleteSubCategoryId);
module.exports = routes;
