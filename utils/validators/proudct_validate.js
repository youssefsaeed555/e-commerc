const { check } = require('express-validator')

const validatorMiddlware = require('../../middlewares/express_validator')

exports.createProuct = [
    check('title')
        .notEmpty()
        .withMessage('title of proudct required')
        .isLength({ max: 30 })
        .withMessage('too max proudct title')
        .isLength({ min: 5 })
        .withMessage('too min proudct title'),
    check('description')
        .notEmpty()
        .withMessage('description of proudct required')
        .isLength({ min: 5 })
        .withMessage('too min proudct description'),
    check('quantity')
        .notEmpty()
        .withMessage('quantity of proudct required')
        .isNumeric()
        .withMessage('quantity of proudct must be numeric'),
    check('sold')
        .optional()
        .isNumeric()
        .withMessage('sold of proudct must be numeric'),
    check('category')
        .notEmpty()
        .withMessage('product must belong to category')
        .isMongoId()
        .withMessage('invalid id format'),
    check('brand')
        .optional()
        .isMongoId()
        .withMessage('invalid id format'),
    check('subCategory')
        .optional()
        .isMongoId()
        .withMessage('invalid id format'),
    check('price')
        .notEmpty()
        .withMessage('proudct price required')
        .isNumeric()
        .withMessage('price must be numeric')
        .isLength({ max: 10 })
        .withMessage('too amx length price'),
    check('priceAfterDiscount')
        .isNumeric()
        .withMessage('price after discount must be numeric')
        .toFloat()
        .custom((value, { req }) => {
            if (req.body.price <= value) {
                throw new Error('price after discount must be lower than price')
            }
            return true
        }),
    check('color')
        .optional()
        .isArray()
        .withMessage('colors should be array of string'),
    check('images')
        .optional()
        .isArray()
        .withMessage('images should be array of string'),
    check('coverImage')
        .notEmpty()
        .withMessage('cover of proudct required'),
    check('averageRaiting')
        .optional()
        .isNumeric()
        .withMessage('raiting must be numberic')
        .isLength({ min: 1 })
        .withMessage('raiting must be above or equal 1.0')
        .isLength({ max: 5 })
        .withMessage('raiting must be less than or equal 1.0'),
    check('countOfRaiting')
        .optional()
        .isNumeric()
        .withMessage('count of raiting must be numeric'),
    validatorMiddlware
]
exports.getProudctId =
    [
        check('id').isMongoId().withMessage(`invalid id format `),
        validatorMiddlware
    ]

exports.validateUpdatePRoudct =
    [
        check('id').isMongoId().withMessage(`invalid id format `),
        validatorMiddlware
    ]
exports.validateDeletePRoudct =
    [
        check('id').isMongoId().withMessage(`invalid id format `),
        validatorMiddlware
    ]