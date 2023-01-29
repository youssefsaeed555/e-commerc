const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");
const upload = require("../middlewares/upload_Image");
const factoryHandler = require("./factory_handler");
const user = require("../models/users");

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
exports.updateUser = factoryHandler.updateOne(user);

//@desc  delete user
//@route DELETE /api/v1/user/:id
//@acess private
exports.deleteUser = factoryHandler.deleteOne(user);
