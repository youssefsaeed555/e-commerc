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
const { protect, isAllowedTo } = require("../services/auth_services");

const routes = express.Router({ mergeParams: true });
//we need to acess params but from parent route

routes
  .route("/")
  .get(getsubCategories)
  .post(
    protect,
    isAllowedTo("admin", "manger"),
    createSubOfCategory,
    createSubCategoryValidate,
    createSubCategory
  );

routes
  .route("/:id")
  .get(checkSubCategoryId, getsubCategoryId)
  .put(
    protect,
    isAllowedTo("admin", "manger"),
    validateUpdateSubCategory,
    updateSubCategoryId
  )
  .delete(
    protect,
    isAllowedTo("admin"),
    validateDeleteSubCategory,
    deleteSubCategoryId
  );
module.exports = routes;
