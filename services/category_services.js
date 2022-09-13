const slug = require('slugify')
const asyncHandler = require('express-async-handler')
const category = require('../models/categrories')
const categrories = require('../models/categrories')
const ApiError = require('../utils/ApiError')


//@desc  get categories
//@route GET /api/v1/categories/
//@acess public
exports.getCategory = asyncHandler(async (req, res) => {
    const page = req.query.page || 1
    const limit = req.query.limit || 3
    const skip = (page - 1) * limit
    const categories = await category.find({}).skip(skip).limit(limit)
    return res.status(200).json({ count: categories.length, page, data: categories })
})

//@desc   create category
//@route POST   /api/v1/categories/
//@acess  private
exports.addCatgory = asyncHandler(async (req, res) => {

    const { name } = req.body
    const catgory = await category.create({ name, slug: slug(name) })
    res.status(201).json({ data: catgory })
})


//@desc  get category by id
//@route GET /api/v1/categories/:id
//@acess public
exports.getCategoryId = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    // eslint-disable-next-line no-shadow
    const category = await categrories.findById(id)
    if (!category) {
        return next(new ApiError(`no category for this id : ${id}`, 404))
    }
    res.status(200).json({ data: category })
})


//@desc  update category
//@route PUT /api/v1/categories/:id
//@acess private
exports.updateCategoryId = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const { name } = req.body
    // eslint-disable-next-line no-shadow
    const category = await categrories.findOneAndUpdate(
        { _id: id },
        { name, slug: slug(name) },
        { new: true } //return document after update
    )
    if (!category) {
        return next(new ApiError(`no category for this id : ${id}`, 404))
    }
    res.status(200).json({ data: category })
})

//@desc  delete category
//@route DELETE /api/v1/categories/:id
//@acess private
exports.deleteCategoryId = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    // eslint-disable-next-line no-shadow
    const category = await categrories.findByIdAndDelete(id)
    if (!category) {
        return next(new ApiError(`no category for this id : ${id}`, 404))
    }
    res.status(204).json({ msg: `delete category succesfuly` })
})
