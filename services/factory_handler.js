const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const ApiFeature = require("../utils/Api_feature");

exports.createDocument = (Model) =>
  asyncHandler(async (req, res) => {
    const document = await Model.create(req.body);
    res.status(201).json({ data: document });
  });

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);
    if (!document) {
      return next(new ApiError(`no document for this id : ${id}`, 404));
    }
    document.remove();
    res.status(204).json({ msg: `delete category succesfuly` });
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    // eslint-disable-next-line no-shadow
    const document = await Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } //return document after update
    );
    if (!document) {
      return next(
        new ApiError(`no document for this id : ${req.params.id}`, 404)
      );
    }
    //trigger save vent when update document
    document.save();
    res.status(200).json({ data: document });
  });

exports.getDocument = (Model, optionPopulation) =>
  asyncHandler(async (req, res, next) => {
    //build query
    let query = Model.findById(req.params.id);
    if (optionPopulation) {
      query = query.populate(optionPopulation);
    }
    //excute query
    const getDocument = await query;
    if (!getDocument) {
      return next(
        new ApiError(`no document for this id ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ data: getDocument });
  });

exports.findListOfDocs = (Model, modelName = "") =>
  asyncHandler(async (req, res, next) => {
    let objectFilter = {};
    if (req.objFilter) objectFilter = req.objFilter;
    //get count of documents
    const countDocs = await Model.countDocuments();

    //create object frim api_feature class (build query)
    const apiFeature = new ApiFeature(Model.find(objectFilter), req.query)
      .fields()
      .search(modelName)
      .sort()
      .filter()
      .paginate(countDocs);

    const { buildQuery, paginationResult } = apiFeature;

    //excute query
    const document = await buildQuery;
    if (document.length === 0)
      return next(new ApiError(`no documents found`, 404));

    return res
      .status(200)
      .json({ count: document.length, paginationResult, data: document });
  });
