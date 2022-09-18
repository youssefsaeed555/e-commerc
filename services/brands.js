const slug = require('slugify')
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
exports.addBrand = asyncHandler(async (req, res) => {

    const { name } = req.body
    const brands = await brand.create({ name, slug: slug(name) })
    res.status(201).json({ data: brands })
})


//@desc  get brand by id
//@route GET /api/v1/brand/:id
//@acess public
exports.getBrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    // eslint-disable-next-line no-shadow
    const spesficBrand = await brand.findById(id)
    if (!spesficBrand) {
        return next(new ApiError(`no brand for this id : ${id}`, 404))
    }
    res.status(200).json({ data: spesficBrand })
})


//@desc  update brand
//@route PUT /api/v1/brands/:id
//@acess private
exports.updateBrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const { name } = req.body
    // eslint-disable-next-line no-shadow
    const updateBrand = await brand.findOneAndUpdate(
        { _id: id },
        { name, slug: slug(name) },
        { new: true } //return document after update
    )
    if (!updateBrand) {
        return next(new ApiError(`no brand for this id : ${id}`, 404))
    }
    res.status(200).json({ data: updateBrand })
})

//@desc  delete brand
//@route DELETE /api/v1/brands/:id
//@acess private
exports.deleteBrand = factoryHandler.deleteOne(brand)
