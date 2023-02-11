const ApiError = require("../utils/ApiError");
//error handling for devolopment mode
const sendErrorForDev = (err, res) =>
  res.status(err.statusCode).json({
    message: err.message,
    error: err,
    stack: err.stack,
    status: err.status,
  });

//error handling for production mode
const sendErrorForProd = (err, res) =>
  res.status(err.statusCode).json({
    message: err.message,
    status: err.status,
  });

const handleJsonWebTokenError = () =>
  new ApiError("invalid token, please login again ", 401);

const handleTokenExpiredError = () =>
  new ApiError("token expired you must login again ...", 401);

//global express error handling
const errorMiddelware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (err.name === "TokenExpiredError") {
    err = handleTokenExpiredError();
  }
  if (err.name === "JsonWebTokenError") {
    err = handleJsonWebTokenError();
  }
  if (process.env.NODE_ENV === "devolopment") {
    sendErrorForDev(err, res);
  } else {
    sendErrorForProd(err, res);
  }
};
module.exports = errorMiddelware;
