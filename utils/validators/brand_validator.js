const { check } = require("express-validator");
const slugify = require("slugify");
const validatorMiddlware = require("../../middlewares/express_validator");

exports.checkBrandId = [
  check("id").isMongoId().withMessage(`invalid id format `),
  validatorMiddlware,
];

exports.createBrandValidate = [
  check("name")
    .notEmpty()
    .withMessage("brand required")
    .isLength({ min: 5 })
    .withMessage("too short brand")
    .isLength({ max: 35 })
    .withMessage("too long brand")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("slug").toLowerCase(),
  validatorMiddlware,
];
exports.validateUpdateBrand = [
  check("id").isMongoId().withMessage(`invalid id format `),
  check("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val).toLowerCase();
      return true;
    }),
  check("image").optional(),
  validatorMiddlware,
];
exports.validateDeleteBrand = [
  check("id").isMongoId().withMessage(`invalid id format `),
  validatorMiddlware,
];
