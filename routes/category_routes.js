const express = require('express')

const routes = express.Router()
const {
    checkCategoryId,
    createCategoryValidate,
    validateDeleteCategory,
    validateUpdateCategory
} = require('../utils/validators/category_validator')
const
    {
        addCatgory,
        getCategory,
        getCategoryId,
        updateCategoryId,
        deleteCategoryId
    } = require('../services/category_services')

routes.route('/')
    .get(getCategory)
    .post(
        createCategoryValidate,
        addCatgory)


routes.route('/:id')
    .get(
        checkCategoryId,
        getCategoryId)
    .put(
        validateUpdateCategory,
        updateCategoryId)
    .delete(
        validateDeleteCategory,
        deleteCategoryId)

module.exports = routes