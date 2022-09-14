const { check } = require('express-validator')
const validatorMiddlware = require('../../middlewares/express_validator')

exports.checkSubCategoryId = [
    check('id').isMongoId().withMessage(`invalid id format `),
    validatorMiddlware
]

exports.createSubCategoryValidate = [
    check('name')
        .notEmpty()
        .withMessage('catgory required')
        .isLength({ min: 5 })
        .withMessage('too short catgory')
        .isLength({ max: 35 })
        .withMessage('too long SubCategory'),
    check('slug')
        .toLowerCase(),
    check('category')
        .notEmpty()
        .withMessage('subcategory must belong to category')
        .isMongoId()
        .withMessage('invalid category id format'),
    validatorMiddlware
]
exports.validateUpdateSubCategory =
    [
        check('id').isMongoId().withMessage(`invalid id format `),
        validatorMiddlware
    ]
exports.validateDeleteSubCategory =
    [
        check('id').isMongoId().withMessage(`invalid id format `),
        validatorMiddlware
    ]
