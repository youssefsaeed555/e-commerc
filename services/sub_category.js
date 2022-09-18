const asyncHandler = require('express-async-handler')

const SubCategory = require('../models/sub_category')

const ApiError = require('../utils/ApiError')

const ApiFeature = require('../utils/Api_feature')

const factoryHandler = require('./factory_handler')



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
exports.createSubCategory = factoryHandler.createDocument(SubCategory)


//@desc  get subcategories
//@route get /api/v1/subCategories/
//@acess public
exports.getsubCategories = asyncHandler(async (req, res) => {

    const objectFilter = {}

    if (req.params.categoryId) {
        objectFilter.category = req.params.categoryId
    }
    //get count of documents
    const countDocs = await SubCategory.countDocuments()

    const apiFeature = new ApiFeature(SubCategory.find(objectFilter), req.query)
        .fields()
        .search()
        .sort()
        .filter()
        .paginate(countDocs)
    const { buildQuery, paginationResult } = apiFeature

    const listSubCategories = await buildQuery
    return res.status(200).json({
        count: listSubCategories.length,
        paginationResult,
        data: listSubCategories
    })
})

//@desc  get subcategory by id
//@route GET /api/v1/subCategories/:id
//@acess public
exports.getsubCategoryId = factoryHandler.getDocument(SubCategory)

//@desc  update subcategory
//@route PUT /api/v1/subCategories/:id
//@acess private
exports.updateSubCategoryId = factoryHandler.updateOne(SubCategory)

//@desc  delete subCategories
//@route DELETE /api/v1/subCategories/:id
//@acess private
exports.deleteSubCategoryId = factoryHandler.deleteOne(SubCategory)
