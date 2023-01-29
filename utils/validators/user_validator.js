const { check } = require("express-validator");
// eslint-disable-next-line node/no-extraneous-require
const bcrypt = require("bcryptjs");
const validation = require("../../middlewares/express_validator");

const user = require("../../models/users");

exports.validateAddUser = [
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
  check("profileImg").optional(),
  check("role").optional(),
  check("phone")
    .optional()
    .isMobilePhone("ar-EG")
    .withMessage("input valid egyptian phone"),
  validation,
];

exports.validateUpdateUser = [
  check("id").isMongoId().withMessage(`invalid id format `),
  check("name").optional(),
  check("profileImg").optional(),
  check("email")
    .optional()
    .isEmail()
    .custom(async (val, { req }) => {
      const checkUser = await user.findOne({ email: val });
      if (checkUser) {
        throw new Error("email already exist");
      }
      return true;
    }),
  check("profileImg").optional(),
  check("role").optional(),
  check("phone")
    .optional()
    .isMobilePhone("ar-EG")
    .withMessage("input valid egyptian phone"),
  validation,
];

exports.validateChangePassword = [
  check("currentPassword")
    .notEmpty()
    .withMessage("current Password is required"),
  check("confirmPassword")
    .notEmpty()
    .withMessage("confirm Password is required"),
  check("password")
    .notEmpty()
    .withMessage("new Password is required")
    .custom(async (val, { req }) => {
      const spesficUser = await user.findOne({ _id: req.params.id });
      //validate current password
      const matchPassword = await bcrypt.compare(
        req.body.currentPassword,
        spesficUser.password
      );
      console.log(matchPassword);
      if (!matchPassword) {
        throw new Error("current password is incorrect");
      }
      //vallidate confirm password
      if (val !== req.body.confirmPassword) {
        throw new Error("confirm password is incorrect");
      }
      return true;
    }),
  validation,
];

exports.validateDeleteUser = [
  check("id").isMongoId().withMessage(`invalid id format `),
  validation,
];
