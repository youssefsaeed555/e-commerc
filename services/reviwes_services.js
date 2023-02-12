const Review = require("../models/review");
const factoryHandler = require("./factory_handler");

exports.setParamsOfProduct = (req, res, next) => {
  const objFilter = {};
  if (req.params.productId) {
    objFilter.product = req.params.productId;
  }
  req.objFilter = objFilter;
  next();
};

exports.setProductAndUserBody = async (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user._id;
  next();
};

//@desc  get review
//@route GET /api/v1/brands/
//@acess public
exports.getReviews = factoryHandler.findListOfDocs(Review);

//@desc   create brand
//@route POST   /api/v1/brands/
//@acess  private/protect/user
exports.addReview = factoryHandler.createDocument(Review);

//@desc  get brand by id
//@route GET /api/v1/brand/:id
//@acess public
exports.getReview = factoryHandler.getDocument(Review);

//@desc  update brand
//@route PUT /api/v1/brands/:id
//@acess private/protect/user
exports.updateReview = factoryHandler.updateOne(Review);

//@desc  delete brand
//@route DELETE /api/v1/brands/:id
//@acess private/protect/user-admin-manger
exports.deleteReview = factoryHandler.deleteOne(Review);
