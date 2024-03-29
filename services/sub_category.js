const SubCategory = require("../models/sub_category");

const factoryHandler = require("./factory_handler");

//create sub based on category & check if no category sent take it from params
//without this function it will generate an error because it enter in validation
//before setting category from params to body because it required in validation
exports.createSubOfCategory = (req, res, next) => {
  //no category becouse it send in params
  if (!req.body.category) {
    req.body.category = req.params.categoryId;
  }
  next();
};

exports.setParamsOfCategory = (req, res, next) => {
  const objFilter = {};
  if (req.params.categoryId) {
    objFilter.category = req.params.categoryId;
  }
  req.objFilter = objFilter;
  next();
};

// if (req.params.categoryId) {
//   objectFilter.category = req.params.categoryId;
// }

//@desc  post sub categories
//@route POST /api/v1/subCategories/
//@acess private
exports.createSubCategory = factoryHandler.createDocument(SubCategory);

//@desc  get subcategories
//@route get /api/v1/subCategories/
//@acess public
exports.getsubCategories = factoryHandler.findListOfDocs(SubCategory);

//@desc  get subcategory by id
//@route GET /api/v1/subCategories/:id
//@acess public
exports.getsubCategoryId = factoryHandler.getDocument(SubCategory);

//@desc  update subcategory
//@route PUT /api/v1/subCategories/:id
//@acess private
exports.updateSubCategoryId = factoryHandler.updateOne(SubCategory);

//@desc  delete subCategories
//@route DELETE /api/v1/subCategories/:id
//@acess private
exports.deleteSubCategoryId = factoryHandler.deleteOne(SubCategory);
