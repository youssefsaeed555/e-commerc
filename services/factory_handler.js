const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/ApiError')
const ApiFeature = require('../utils/Api_feature')

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
