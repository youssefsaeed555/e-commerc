const { check } = require("express-validator");
const validatorMiddlware = require("../../middlewares/express_validator");
const Coupon = require("../../models/coupon");

exports.checkCouponId = [
  check("id").isMongoId().withMessage(`invalid id format `),
  validatorMiddlware,
];

exports.createCouponValidate = [
  check("name")
    .notEmpty()
    .withMessage("Coupon name is required")
    .isString()
    .withMessage("coupon must be string")
    .toUpperCase()
    .custom(async (val, { req }) => {
      const coupon = await Coupon.findOne({ name: val });
      if (coupon) {
        throw new Error("this coupon name is exist");
      }
      return true;
    }),
  check("discount")
    .isNumeric()
    .withMessage("coupon discount must be numeric")
    .notEmpty()
    .withMessage("Coupon discount is required"),
  check("expires").notEmpty().withMessage("Coupon date is required"),
  validatorMiddlware,
];
exports.validateUpdateCoupon = [
  check("id").isMongoId().withMessage(`invalid id format `),
  check("name")
    .optional()
    .isString()
    .withMessage("coupon must be string")
    .toUpperCase()
    .custom(async (val, { req }) => {
      const coupon = await Coupon.findOne({ name: val });
      if (coupon) {
        throw new Error("this coupon name is exist");
      }
      return true;
    }),
  check("discount")
    .isNumeric()
    .withMessage("coupon discount must be numeric")
    .optional(),
  check("expires").optional(),
  validatorMiddlware,
];
exports.validateDeletCoupon = [
  check("id").isMongoId().withMessage(`invalid id format `),
  validatorMiddlware,
];
