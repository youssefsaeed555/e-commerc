const asyncHandler = require('express-async-handler')
const Category = require('../models/categrories')
const ApiError = require('../utils/ApiError')
const ApiFeature = require('../utils/Api_feature')
const factoryHandler = require('./factory_handler')

//@desc  get categories
//@route GET /api/v1/categories/
//@acess public
exports.getCategory = asyncHandler(async (req, res) => {
    const countDocs = await Category.countDocuments()

    const apiFeature = new ApiFeature(Category.find(), req.query)
        .fields()
        .search()
        .sort()
        .filter()
        .paginate(countDocs)
    const { buildQuery, paginationResult } = apiFeature
    const categories = await buildQuery
    return res.status(200).json(
        {
            count: categories.length,
            paginationResult,
            data: categories
        })
})

//@desc   create category
//@route POST   /api/v1/categories/
//@acess  private
exports.addCatgory = factoryHandler.createDocument(Category)


//@desc  get category by id
//@route GET /api/v1/categories/:id
//@acess public
exports.getCategoryId = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    // eslint-disable-next-line no-shadow
    const category = await Category.findById(id)
    if (!category) {
        return next(new ApiError(`no category for this id : ${id}`, 404))
    }
    res.status(200).json({ data: category })
})


//@desc  update category
//@route PUT /api/v1/categories/:id
//@acess private
exports.updateCategoryId = factoryHandler.updateOne(Category)

//@desc  delete category
//@route DELETE /api/v1/categories/:id
//@acess private
exports.deleteCategoryId = factoryHandler.deleteOne(Category)
