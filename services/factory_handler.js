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
