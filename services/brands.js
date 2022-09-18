const asyncHandler = require('express-async-handler')
const brand = require('../models/brands')
const ApiError = require('../utils/ApiError')
const ApiFeature = require('../utils/Api_feature')
const factoryHandler = require('./factory_handler')


//@desc  get brands
//@route GET /api/v1/brands/
//@acess public
exports.getbrands = asyncHandler(async (req, res) => {
    const countDocs = await brand.countDocuments()

    const apiFeature = new ApiFeature(brand.find(), req.query)
        .fields()
        .search()
        .sort()
        .filter()
        .paginate(countDocs)
    const { buildQuery, paginationResult } = apiFeature
    const brands = await buildQuery
    return res.status(200).json(
        {
            count: brands.length,
            paginationResult,
            data: brands
        })
})

//@desc   create brand
//@route POST   /api/v1/brands/
//@acess  private
exports.addBrand = factoryHandler.createDocument(brand)


//@desc  get brand by id
//@route GET /api/v1/brand/:id
//@acess public
exports.getBrand = factoryHandler.getDocument(brand)


//@desc  update brand
//@route PUT /api/v1/brands/:id
//@acess private
exports.updateBrand = factoryHandler.updateOne(brand)

//@desc  delete brand
//@route DELETE /api/v1/brands/:id
//@acess private
exports.deleteBrand = factoryHandler.deleteOne(brand)
