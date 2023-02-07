const express = require("express");

const routes = express.Router();
const {
  signUp,
  login,
  forgetPassword,
  verifyCode,
  resetPassword,
} = require("../services/auth_services");

const {
  validateSignup,
  validateLogin,
} = require("../utils/validators/auth_validator");

routes.route("/signup").post(validateSignup, signUp);
routes.route("/login").post(validateLogin, login);
routes.route("/forgetPassword").post(forgetPassword);
routes.route("/verifyCode").post(verifyCode);
routes.route("/resetPassword").put(resetPassword);

module.exports = routes;
