const slug = require('slugify')
const asyncHandler = require('express-async-handler')
const Proudct = require('../models/proudct')
const ApiError = require('../utils/ApiError')


//@desc  get Proudcts
//@route GET /api/v1/proudcts/
//@acess public
exports.getProudcts = asyncHandler(async (req, res) => {
    //exclusive any qeury not send in req
    //1-filtering
    const queryObj = { ...req.query }
    const exclusives = ['page', 'limit', 'sort', 'fields']
    //delete not send in query
    exclusives.forEach((ele) => delete queryObj[ele])

    //apply[gt,gte,lt,lte] to query sent
    let qryString = JSON.stringify(queryObj) //1-convert json to string
    qryString = qryString.replace(/\b(gt|gte|lt|lte)\b/g, (idx) => `$${idx}`)
    //add $ to string to send in query mongosse


    //2-pagination 
    const page = req.query.page || 1
    const limit = req.query.limit || 5
    const skip = (page - 1) * limit

    //build query 
    let buildQuery = Proudct.find(JSON.parse(qryString))
        .skip(skip)
        .limit(limit)
        .populate({ path: 'category', select: 'name -_id' })

    //3-sort
    if (req.query.sort) {
        //remove , send in query to send in sort
        const sorting = req.query.sort.split(",").join(" ")
        console.log(sorting)
        //chain sort query
        buildQuery = buildQuery.sort(sorting)
    } else {
        //if no sort send then sortt them based on newest
        buildQuery = buildQuery.sort('-createdAt')
    }
    //4-select fileds
    if (req.query.fields) {
        //chain select to build query
        const fields = req.query.fields.split(',').join(' ')
        buildQuery = buildQuery.select(fields)
    } else {
        buildQuery = buildQuery.select('-__v')
    }

    //excute query 
    const product = await buildQuery

    if (product.length === 0) return res.json({ message: 'remove some query to get results' })

    return res.status(200).json({ count: product.length, page, data: product })
})

//@desc   create Proudct
//@route POST   /api/v1/proudcts/
//@acess  private
exports.addProudct = asyncHandler(async (req, res) => {

    req.body.slug = slug(req.body.title)
    const proudct = await Proudct.create(req.body)
    res.status(201).json({ data: proudct })
})


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
exports.updateProudctId = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    if (req.body.title) {
        req.body.slug = slug(req.body.title)
    }
    // eslint-disable-next-line no-shadow
    const proudct = await Proudct.findOneAndUpdate(
        { _id: id },
        req.body,
        { new: true } //return document after update
    )
    if (!proudct) {
        return next(new ApiError(`no proudct for this id : ${id}`, 404))
    }
    res.status(200).json({ data: proudct })
})

//@desc  delete Proudct
//@route DELETE /api/v1/proudcts/:id
//@acess private
exports.deleteProudctId = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    // eslint-disable-next-line no-shadow
    const proudct = await Proudct.findByIdAndDelete(id)
    if (!proudct) {
        return next(new ApiError(`no proudct for this id : ${id}`, 404))
    }
    res.status(204).json({ msg: `delete proudct succesfuly` })
})
