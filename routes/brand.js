const express = require('express')

const routes = express.Router()
const {
    checkBrandId,
    createBrandValidate,
    validateDeleteBrand,
    validateUpdateBrand
} = require('../utils/validators/brand_validator')
const
    {
        getBrand,
        getbrands,
        addBrand,
        updateBrand,
        deleteBrand
    } = require('../services/brands')

//const subCateogry = require('./sub_category')

//deal with subcategories for spesfic category
//routes.use('/:brandId/subCategory', subCateogry)

routes.route('/')
    .get(getbrands)
    .post(
        createBrandValidate,
        addBrand)


routes.route('/:id')
    .get(
        checkBrandId,
        getBrand)
    .put(
        validateUpdateBrand,
        updateBrand)
    .delete(
        validateDeleteBrand,
        deleteBrand)

module.exports = routes