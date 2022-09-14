const slug = require('slugify')

const asyncHandler = require('express-async-handler')

const SubCategory = require('../models/sub_category')

const ApiError = require('../utils/ApiError')

//create sub based on category & check if no cateogry sent takt it from params
exports.createSubOfCategory = (req, res, next) => {
    //no category becouse it send in params
    if (!req.body.category) {
        req.body.category = req.params.categoryId
    }
    next()
}

//@desc  post sub categories
//@route POST /api/v1/subCategories/
//@acess private
exports.createSubCategory = asyncHandler(async (req, res, next) => {
    const { name, category } = req.body

    const subCategory = await SubCategory.create({
        name,
        slug: slug(name),
        category: category
    })
    return res.status(201).json({
        message: 'sub category created succssfly',
        data: subCategory
    })
})


//@desc  get subcategories
//@route get /api/v1/subCategories/
//@acess public
exports.getsubCategories = asyncHandler(async (req, res) => {
    const { page } = req.query || 1
    const { limit } = req.query || 5
    const skip = (page - 1) * limit
    const objectFilter = {}
    if (req.params.categoryId) {
        objectFilter.category = req.params.categoryId
    }
    const listSubCategories = await SubCategory.find(objectFilter).skip(skip).limit(limit)
    return res.status(200).json({
        count: listSubCategories.length,
        page,
        data: listSubCategories
    })
})

//@desc  get subcategory by id
//@route GET /api/v1/subCategories/:id
//@acess public
exports.getsubCategoryId = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const spesficSubCategory = await SubCategory.findById(id)
    if (!spesficSubCategory) {
        return next(new ApiError(`no sub category for this id ${id}`, 404))
    }
    res.status(200).json({ data: spesficSubCategory })
})

//@desc  update subcategory
//@route PUT /api/v1/subCategories/:id
//@acess private
exports.updateSubCategoryId = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const { name, category } = req.body
    const updateSubCategory = await SubCategory.findByIdAndUpdate(
        { _id: id },
        { name, category, slug: slug(name) },
        { new: true }
    )
    if (!updateSubCategory) {
        return next(new ApiError(`no subCategory for this id : ${id}`, 404))
    }
    return res.status(200).json({ message: 'update successfuly', data: updateSubCategory })
})

//@desc  delete subCategories
//@route DELETE /api/v1/subCategories/:id
//@acess private
exports.deleteSubCategoryId = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    // eslint-disable-next-line no-shadow
    const category = await SubCategory.findByIdAndDelete(id)
    if (!category) {
        return next(new ApiError(`no subCategory for this id : ${id}`, 404))
    }
    res.status(204).json({ msg: `delete subCategory succesfuly` })
})
