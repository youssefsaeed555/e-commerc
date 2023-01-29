const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");
const Category = require("../models/categrories");
const factoryHandler = require("./factory_handler");
const upload = require("../middlewares/upload_Image");

exports.resize = asyncHandler(async (req, res, next) => {
  if (req.file) {
    const fn = `category-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/category/${fn}`); //save file in the disk

    req.body.image = fn;
  }

  next();
});

exports.uploadSingle = upload.uploadSingleImage("image");

//@desc  get categories
//@route GET /api/v1/categories/
//@acess public
exports.getCategory = factoryHandler.findListOfDocs(Category);
//@desc   create category
//@route POST   /api/v1/categories/
//@acess  private
exports.addCatgory = factoryHandler.createDocument(Category);

//@desc  get category by id
//@route GET /api/v1/categories/:id
//@acess public
exports.getCategoryId = factoryHandler.getDocument(Category);

//@desc  update category
//@route PUT /api/v1/categories/:id
//@acess private
exports.updateCategoryId = factoryHandler.updateOne(Category);

//@desc  delete category
//@route DELETE /api/v1/categories/:id
//@acess private
exports.deleteCategoryId = factoryHandler.deleteOne(Category);
