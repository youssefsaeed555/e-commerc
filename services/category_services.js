const Category = require('../models/categrories')
const factoryHandler = require('./factory_handler')

//@desc  get categories
//@route GET /api/v1/categories/
//@acess public
exports.getCategory = factoryHandler.findListOfDocs(Category)
//@desc   create category
//@route POST   /api/v1/categories/
//@acess  private
exports.addCatgory = factoryHandler.createDocument(Category)


//@desc  get category by id
//@route GET /api/v1/categories/:id
//@acess public
exports.getCategoryId = factoryHandler.getDocument(Category)


//@desc  update category
//@route PUT /api/v1/categories/:id
//@acess private
exports.updateCategoryId = factoryHandler.updateOne(Category)

//@desc  delete category
//@route DELETE /api/v1/categories/:id
//@acess private
exports.deleteCategoryId = factoryHandler.deleteOne(Category)
