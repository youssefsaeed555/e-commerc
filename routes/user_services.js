const express = require("express");

const routes = express.Router();
const {
  getUser,
  addUser,
  getUsers,
  deleteUser,
  updateUser,
  upload,
  resize,
  changePassword,
} = require("../services/user_services");

const {
  validateAddUser,
  validateDeleteUser,
  validateUpdateUser,
  validateChangePassword,
} = require("../utils/validators/user_validator");

const { protect, isAllowedTo } = require("../services/auth_services");

routes
  .route("/")
  .get(protect, isAllowedTo("admin", "manger"), getUsers)
  .post(
    protect,
    isAllowedTo("admin"),
    upload,
    resize,
    validateAddUser,
    addUser
  );
routes.route("/changePassword/:id").put(validateChangePassword, changePassword);
routes
  .route("/:id")
  .get(protect, isAllowedTo("admin"), getUser)
  .put(
    protect,
    isAllowedTo("admin"),
    upload,
    resize,
    validateUpdateUser,
    updateUser
  )
  .delete(protect, isAllowedTo("admin"), validateDeleteUser, deleteUser);

module.exports = routes;
