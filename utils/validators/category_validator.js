const { check } = require('express-validator')

const slugify = require('slugify')

const validatorMiddlware = require('../../middlewares/express_validator')

exports.checkCategoryId = [
    check('id').isMongoId().withMessage(`invalid id format `),
    validatorMiddlware
]

exports.createCategoryValidate = [
    check('name')
        .notEmpty()
        .withMessage('catgory required')
        .isLength({ min: 5 })
        .withMessage('too short catgory')
        .isLength({ max: 35 })
        .withMessage('too long category'),
    check('slug')
        .toLowerCase(),
    validatorMiddlware
]
exports.validateUpdateCategory =
    [
        check('id').isMongoId().withMessage(`invalid id format `),
        check('name').custom((val, { req }) => {
            req.body.slug = slugify(val).toLowerCase()
            return true //that mean parameter val is passed succesfuly
        }),
        validatorMiddlware
    ]
exports.validateDeleteCategory =
    [
        check('id').isMongoId().withMessage(`invalid id format `),
        validatorMiddlware
    ]
