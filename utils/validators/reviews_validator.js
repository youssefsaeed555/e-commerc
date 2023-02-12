const { check } = require("express-validator");
const validatorMiddlware = require("../../middlewares/express_validator");
const Review = require("../../models/review");

exports.checkReview = [
  check("id").isMongoId().withMessage(`invalid id format `),
  validatorMiddlware,
];

exports.createReviewValidate = [
  check("title").optional(),
  check("rating")
    .notEmpty()
    .withMessage("rating is required")
    .isFloat({ min: 1, max: 5 })
    .withMessage("rating must be between 1.0 and 5.0"),
  check("product").custom(async (val, { req }) => {
    //check if user create review before in this product
    const review = await Review.findOne({
      user: req.body.user,
      product: req.body.product,
    });
    if (review) {
      throw new Error("you already create review before");
    }
    return true;
  }),
  validatorMiddlware,
];
exports.validateUpdateReview = [
  check("id")
    .isMongoId()
    .withMessage(`invalid id format `)
    .custom(async (val, { req }) => {
      const review = await Review.findById(val);
      if (!review) {
        throw new Error("review not found");
      }
      if (review.user._id.toString() !== req.user._id.toString()) {
        throw new Error("you not allowed to modify this review");
      }
      return true;
    }),
  validatorMiddlware,
];
exports.validateDeleteReview = [
  check("id")
    .isMongoId()
    .withMessage(`invalid id format `)
    .custom(async (val, { req }) => {
      const review = await Review.findById(val);
      if (!review) {
        throw new Error("review not found");
      }
      if (req.user.role === "user") {
        if (review.user._id.toString() !== req.user._id.toString()) {
          throw new Error("you not allowed to delete this review");
        }
      }
      return true;
    }),
  validatorMiddlware,
];
