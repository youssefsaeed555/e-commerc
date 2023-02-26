const asyncHandler = require("express-async-handler");
const User = require("../models/users");

exports.addToWishlist = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { wishList: req.body.productId },
    },
    { new: true }
  );
  return res.status(200).json({
    message: "product added to wishlist successfully",
    data: user.wishList,
  });
});

exports.removeFromWishlist = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { wishList: req.params.productId },
    },
    { new: true }
  );
  return res.status(200).json({
    message: "product removed from wishlist successfully",
    data: user.wishList,
  });
});

exports.getWishListLoggedUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate("wishList");

  return res.status(200).json({
    message: "return wishList success",
    results: user.wishList.length,
    data: user.wishList,
  });
});
