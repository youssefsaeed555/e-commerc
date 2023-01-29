const express = require("express");

const routes = express.Router();
const { signUp, login } = require("../services/auth_services");

const {
  validateSignup,
  validateLogin,
} = require("../utils/validators/auth_validator");

routes.route("/signup").post(validateSignup, signUp);
routes.route("/login").post(validateLogin, login);
// routes.route("/changePassword/:id").put(validateChangePassword, changePassword);
// routes
//   .route("/:id")
//   .get(getUser)
//   .put(upload, resize, validateUpdateUser, updateUser)
//   .delete(validateDeleteUser, deleteUser);

module.exports = routes;
