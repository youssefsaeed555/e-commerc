const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp')
const asyncHandler = require('express-async-handler')
const brand = require('../models/brands')

const upload = require('../middlewares/upload_Image')
const factoryHandler = require('./factory_handler')

exports.resize = asyncHandler(async (req, res, next) => {
    const ext = req.file.originalname.split('.')[1]
    const fn = `brands-${uuidv4()}-${Date.now()}.${ext}`
    await sharp(req.file.buffer)
        .resize(600, 600)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`uploads/brand/${fn}`)

    req.body.image = fn
    next()
})

exports.uploadSingle = upload.uploadSingleImage('image')

//@desc  get brands
//@route GET /api/v1/brands/
//@acess public
exports.getbrands = factoryHandler.findListOfDocs(brand)

//@desc   create brand
//@route POST   /api/v1/brands/
//@acess  private
exports.addBrand = factoryHandler.createDocument(brand)


//@desc  get brand by id
//@route GET /api/v1/brand/:id
//@acess public
exports.getBrand = factoryHandler.getDocument(brand)


//@desc  update brand
//@route PUT /api/v1/brands/:id
//@acess private
exports.updateBrand = factoryHandler.updateOne(brand)

//@desc  delete brand
//@route DELETE /api/v1/brands/:id
//@acess private
exports.deleteBrand = factoryHandler.deleteOne(brand)
