const express = require("express");

const routes = express.Router();
const {
  checkCategoryId,
  createCategoryValidate,
  validateDeleteCategory,
  validateUpdateCategory,
} = require("../utils/validators/category_validator");
const {
  addCatgory,
  getCategory,
  getCategoryId,
  updateCategoryId,
  deleteCategoryId,
  uploadSingle,
  resize,
} = require("../services/category_services");

const subCateogry = require("./sub_category");
const { protect, isAllowedTo } = require("../services/auth_services");

//deal with subcategories for spesfic category
routes.use("/:categoryId/subCategory", subCateogry);

routes.route("/").get(getCategory).post(
  protect,
  isAllowedTo("admin", "manger"),
  uploadSingle, //with memoryStorage its upload photo to memory => step1
  resize, //reshap photo in memory befor save in disk
  createCategoryValidate,
  addCatgory
);

routes
  .route("/:id")
  .get(checkCategoryId, getCategoryId)
  .put(
    protect,
    isAllowedTo("admin", "manger"),
    uploadSingle, //with memoryStorage its upload photo to memory => step1
    resize, //reshap photo in memory befor save in disk
    validateUpdateCategory,
    updateCategoryId
  )
  .delete(
    protect,
    isAllowedTo("admin"),
    validateDeleteCategory,
    deleteCategoryId
  );

module.exports = routes;
