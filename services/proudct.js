const Proudct = require('../models/proudct')
const factoryHandler = require('./factory_handler')

//@desc  get Proudcts
//@route GET /api/v1/proudcts/
//@acess public
exports.getProudcts = factoryHandler.findListOfDocs(Proudct, "Proudcts")

//@desc   create Proudct
//@route POST   /api/v1/proudcts/
//@acess  private
exports.addProudct = factoryHandler.createDocument(Proudct)


//@desc  get Proudct by id
//@route GET /api/v1/proudcts/:id
//@acess public
exports.getProudct = factoryHandler.getDocument(Proudct)

//@desc  update Proudct
//@route PUT /api/v1/proudcts/:id
//@acess private
exports.updateProudctId = factoryHandler.updateOne(Proudct)

//@desc  delete Proudct
//@route DELETE /api/v1/proudcts/:id
//@acess private
exports.deleteProudctId = factoryHandler.deleteOne(Proudct)
