const asyncHandler = require("express-async-handler");
const User = require("../models/users");

exports.addAddress = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { address: req.body },
    },
    { new: true }
  );
  return res.status(200).json({
    message: "address added successfully to user",
    address: user.address,
  });
});

exports.deleteAddress = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { address: { _id: req.params.addressId } },
    },
    { new: true }
  );
  return res.status(200).json({
    message: "address deleted successfully from user",
    address: user.address,
  });
});

exports.getLoggedUserAddress = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  return res.status(200).json({
    message: "address return successfully",
    address: user.address,
  });
});
