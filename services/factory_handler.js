const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/ApiError')
const ApiFeature = require('../utils/Api_feature')


exports.createDocument = (Model) => asyncHandler(async (req, res) => {
    const document = await Model.create(req.body)
    res.status(201).json({ data: document })
})

exports.deleteOne = (Model) => asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const document = await Model.findByIdAndDelete(id)
    if (!document) {
        return next(new ApiError(`no document for this id : ${id}`, 404))
    }
    res.status(204).json({ msg: `delete category succesfuly` })

})

exports.updateOne = (Model) => asyncHandler(async (req, res, next) => {
    // eslint-disable-next-line no-shadow
    const document = await Model.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } //return document after update
    )
    if (!document) {
        return next(new ApiError(`no document for this id : ${req.params.id}`, 404))
    }
    res.status(200).json({ data: document })
})

exports.getDocument = (Model) => asyncHandler(async (req, res, next) => {
    const getDocument = await Model.findById(req.params.id)
    if (!getDocument) {
        return next(new ApiError(`no document for this id ${req.params.id}`, 404))
    }
    res.status(200).json({ data: getDocument })
})

exports.findListOfDocs = (Model, modelName = '') => asyncHandler(async (req, res) => {
    const objectFilter = {}

    if (req.params.categoryId) {
        objectFilter.category = req.params.categoryId
    }

    //get count of documents 
    const countDocs = await Model.countDocuments()

    //create object frim api_feature class (build query)
    const apiFeature = new ApiFeature(Model.find(objectFilter), req.query)
        .fields()
        .search(modelName)
        .sort()
        .filter()
        .paginate(countDocs)

    const { buildQuery, paginationResult } = apiFeature

    //excute query 
    const document = await buildQuery
    if (document.length === 0) return res.json({ message: 'remove some query to get results' })

    return res.status(200).json({ count: document.length, paginationResult, data: document })
})