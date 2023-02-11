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
  getLoggedUser,
  changePasswordLoggedUser,
  updateloggedUser,
} = require("../services/user_services");

const {
  validateAddUser,
  validateDeleteUser,
  validateUpdateUser,
  validateChangePassword,
  validateUpdateLoggedUser,
} = require("../utils/validators/user_validator");

const { protect, isAllowedTo } = require("../services/auth_services");

routes.use(protect);

routes.get("/getMe", getLoggedUser, getUser);
routes.put(
  "/changeMyPassword",
  validateChangePassword,
  changePasswordLoggedUser
);
routes.route("/updateMe").put(validateUpdateLoggedUser, updateloggedUser);

routes.use(isAllowedTo("admin", "manger"));
routes.route("/").get(getUsers).post(upload, resize, validateAddUser, addUser);
routes.route("/changePassword/:id").put(validateChangePassword, changePassword);
routes
  .route("/:id")
  .get(getUser)
  .put(upload, resize, validateUpdateUser, updateUser)
  .delete(validateDeleteUser, deleteUser);

module.exports = routes;
