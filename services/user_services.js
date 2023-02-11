const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
// eslint-disable-next-line node/no-extraneous-require
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const upload = require("../middlewares/upload_Image");
const factoryHandler = require("./factory_handler");
const user = require("../models/users");
const ApiError = require("../utils/ApiError");
const generateToken = require("../utils/generateToken");

exports.resize = asyncHandler(async (req, res, next) => {
  const fileName = `user-${uuidv4()}-${Date.now()}.jpeg`;
  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/users/${fileName}`);
    req.body.profileImg = fileName;
  }
  next();
});

exports.upload = upload.uploadSingleImage("profileImg");

//@desc  get user
//@route GET /api/v1/user/
//@acess public
exports.getUsers = factoryHandler.findListOfDocs(user);

//@desc   create user
//@route POST   /api/v1/user/
//@acess  private
exports.addUser = factoryHandler.createDocument(user);

//@desc  get user by id
//@route GET /api/v1/user/:id
//@acess public
exports.getUser = factoryHandler.getDocument(user);

//@desc  update user
//@route PUT /api/v1/user/:id
//@acess private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const spesficUser = await user.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      profileImg: req.body.profileImg,
      email: req.body.email,
      phone: req.body.phone,
      role: req.body.role,
    },
    { new: true }
  );
  if (!spesficUser) {
    return next(new ApiError("no septic document for this id", 404));
  }
  return res.status(200).json({ message: "update sucess", spesficUser });
});

//@desc  update user password
//@route PUT /api/v1/user/updatePassword/:id
//@acess private

exports.changePassword = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const spesficUser = await user.findByIdAndUpdate(
    id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      changePasswordAt: Date.now(),
    },
    { new: true }
  );
  if (!spesficUser) {
    return next(new ApiError("no septic document for this id", 404));
  }
  return res.status(200).json({ message: "update password", spesficUser });
});
//@desc  delete user
//@route DELETE /api/v1/user/:id
//@acess private
exports.deleteUser = factoryHandler.deleteOne(user);

exports.getLoggedUser = asyncHandler(async (req, res, next) => {
  req.params.id = req.user._id;
  next();
});

exports.changePasswordLoggedUser = asyncHandler(async (req, res, next) => {
  const updateUser = await user.findByIdAndUpdate(
    req.user._id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      changePasswordAt: Date.now(),
    },
    { new: true }
  );

  //generate token
  const token = generateToken(updateUser._id);

  return res.status(200).json({ updateUser, token });
});

exports.updateloggedUser = asyncHandler(async (req, res, next) => {
  const updateUser = await user.findByIdAndUpdate(
    req.user._id,
    {
      email: req.body.email,
      phone: req.body.phone,
      name: req.body.name,
    },
    { new: true }
  );
  return res.status(200).json({ updateUser });
});
