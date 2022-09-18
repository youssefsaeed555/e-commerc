const { check } = require('express-validator')
const validatorMiddlware = require('../../middlewares/express_validator')

exports.checkBrandId = [
    check('id').isMongoId().withMessage(`invalid id format `),
    validatorMiddlware
]

exports.createBrandValidate = [
    check('name')
        .notEmpty()
        .withMessage('brand required')
        .isLength({ min: 5 })
        .withMessage('too short brand')
        .isLength({ max: 35 })
        .withMessage('too long brand'),
    check('slug')
        .toLowerCase(),
    validatorMiddlware
]
exports.validateUpdateBrand =
    [
        check('id').isMongoId().withMessage(`invalid id format `),
        validatorMiddlware
    ]
exports.validateDeleteBrand =
    [
        check('id').isMongoId().withMessage(`invalid id format `),
        validatorMiddlware
    ]
