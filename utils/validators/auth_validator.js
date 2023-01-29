const { check } = require("express-validator");
// eslint-disable-next-line node/no-extraneous-require
const bcrypt = require("bcryptjs");
const validation = require("../../middlewares/express_validator");

const user = require("../../models/users");

exports.validateSignup = [
  check("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 5 })
    .withMessage("too short name"),
  check("email")
    .notEmpty()
    .withMessage("name is required")
    .isEmail()
    .custom(async (val, { req }) => {
      const checkUser = await user.findOne({ email: val });
      if (checkUser) {
        throw new Error("email alreadt exist");
      }
      return true;
    }),

  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("too short password must be greater than 6 chars"),

  check("confirmPassword")
    .notEmpty()
    .withMessage("confirm password required")
    .custom((val, { req }) => {
      if (val !== req.body.password) {
        throw new Error("password confirm is incorrect");
      }
      return true;
    }),
  validation,
];

exports.validateLogin = [
  check("email")
    .notEmpty()
    .withMessage("name is required")
    .isEmail()
    .withMessage("input valid email"),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("too short password must be greater than 6 chars"),
  validation,
];
