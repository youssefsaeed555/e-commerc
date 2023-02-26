const coupon = require("../models/coupon");

const factoryHandler = require("./factory_handler");

//@desc  get Coupons
//@route GET /api/v1/coupons/
//@acess private admin-manger
exports.getCoupons = factoryHandler.findListOfDocs(coupon);

//@desc   create Coupons
//@route POST   /api/v1/coupons/
//@acess  private admin-manger
exports.addCoupons = factoryHandler.createDocument(coupon);

//@desc  get Coupons by id
//@route GET /api/v1/coupons/:id
//@acess private admin-manger
exports.getCoupon = factoryHandler.getDocument(coupon);

//@desc  update Coupons
//@route PUT /api/v1/coupons/:id
//@acess private admin-manger
exports.updateCoupons = factoryHandler.updateOne(coupon);

//@desc  delete brand
//@route DELETE /api/v1/brands/:id
//@acess private
exports.deleteCoupons = factoryHandler.deleteOne(coupon);
