const { check } = require("express-validator");
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
  validation,
];
exports.validateDeleteUser = [
  check("id").isMongoId().withMessage(`invalid id format `),
  validation,
];
