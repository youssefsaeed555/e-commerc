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
} = require("../services/user_services");

routes.route("/").get(getUsers).post(upload, resize, addUser);

routes
  .route("/:id")
  .get(getUser)
  .put(upload, resize, updateUser)
  .delete(deleteUser);

module.exports = routes;
