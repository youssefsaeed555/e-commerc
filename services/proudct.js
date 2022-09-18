const asyncHandler = require('express-async-handler')
const Proudct = require('../models/proudct')
const ApiError = require('../utils/ApiError')
const ApiFeature = require('../utils/Api_feature')
const factoryHandler = require('./factory_handler')

//@desc  get Proudcts
//@route GET /api/v1/proudcts/
//@acess public
exports.getProudcts = asyncHandler(async (req, res) => {

    //get count of documents 
    const countDocs = await Proudct.countDocuments()

    //create object frim api_feature class (build query)
    const apiFeature = new ApiFeature(Proudct.find(), req.query)
        .fields()
        .search("Proudct")
        .sort()
        .filter()
        .paginate(countDocs)

    const { buildQuery, paginationResult } = apiFeature

    //excute query 
    const product = await buildQuery
    if (product.length === 0) return res.json({ message: 'remove some query to get results' })

    return res.status(200).json({ count: product.length, paginationResult, data: product })
})

//@desc   create Proudct
//@route POST   /api/v1/proudcts/
//@acess  private
exports.addProudct = factoryHandler.createDocument(Proudct)


//@desc  get Proudct by id
//@route GET /api/v1/proudcts/:id
//@acess public
exports.getProudct = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    // eslint-disable-next-line no-shadow
    const proudct = await Proudct.findById(id)
        .populate({ path: 'category', select: 'name -_id' })

    if (!proudct) {
        return next(new ApiError(`no Proudct for this id : ${id}`, 404))
    }
    res.status(200).json({ data: proudct })
})


//@desc  update Proudct
//@route PUT /api/v1/proudcts/:id
//@acess private
exports.updateProudctId = factoryHandler.updateOne(Proudct)
//@desc  delete Proudct
//@route DELETE /api/v1/proudcts/:id
//@acess private
exports.deleteProudctId = factoryHandler.deleteOne(Proudct)
