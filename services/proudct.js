const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");
const Proudct = require("../models/proudct");
const factoryHandler = require("./factory_handler");
const upload = require("../middlewares/upload_Image");

//upload mix of images
exports.uploadImage = upload.uploadMixImage([
  {
    name: "imageCover",
    maxCount: 1,
  },
  {
    name: "images",
    maxCount: 5,
  },
]);

exports.resize = asyncHandler(async (req, res, next) => {
  if (req.files.imageCover) {
    const imageCoverFn = `proudct-${uuidv4()}-${Date.now()}-cover.jpeg`;
    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1200)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/proudct/${imageCoverFn}`);
    req.body.coverImage = imageCoverFn;
  }
  if (req.files.images) {
    //if not definf array get erro push not defined
    req.body.images = [];
    //wait untill all promises end after that continue the code
    //without promise.all code jump to next function without finsh its code
    await Promise.all(
      //map not return promise so we do promise.all
      req.files.images.map(async (img, idx) => {
        //map to wrap for each image in images array
        const imagesFn = `proudct-${uuidv4()}-${Date.now()}-${idx + 1}.jpeg`;
        await sharp(img.buffer)
          .resize(2000, 1200)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`uploads/proudct/${imagesFn}`);
        //cause images is array in proudct schema
        req.body.images.push(imagesFn);
      })
    );
  }
  //to go to next middleware
  next();
});

//@desc  get Proudcts
//@route GET /api/v1/proudcts/
//@acess public
exports.getProudcts = factoryHandler.findListOfDocs(Proudct, "Proudcts");

//@desc   create Proudct
//@route POST   /api/v1/proudcts/
//@acess  private
exports.addProudct = factoryHandler.createDocument(Proudct);

//@desc  get Proudct by id
//@route GET /api/v1/proudcts/:id
//@acess public
exports.getProudct = factoryHandler.getDocument(Proudct);

//@desc  update Proudct
//@route PUT /api/v1/proudcts/:id
//@acess private
exports.updateProudctId = factoryHandler.updateOne(Proudct);

//@desc  delete Proudct
//@route DELETE /api/v1/proudcts/:id
//@acess private
exports.deleteProudctId = factoryHandler.deleteOne(Proudct);
