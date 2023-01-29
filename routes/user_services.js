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

routes.route("/").get(getUsers).post(upload, resize, validateAddUser, addUser);
routes.route("/changePassword/:id").put(validateChangePassword, changePassword);
routes
  .route("/:id")
  .get(getUser)
  .put(upload, resize, validateUpdateUser, updateUser)
  .delete(validateDeleteUser, deleteUser);

module.exports = routes;
