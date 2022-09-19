const brand = require('../models/brands')

const factoryHandler = require('./factory_handler')


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
