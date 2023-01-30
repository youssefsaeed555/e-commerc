// eslint-disable-next-line node/no-extraneous-require
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const user = require("../models/users");
const ApiError = require("../utils/ApiError");

const generateToken = (payload) =>
  jwt.sign({ userId: payload }, process.env.JWT_SECERT, {
    expiresIn: process.env.JWT_EXPIRE,
  });

//@desc signup
//@route GET /api/v1/auth/signup
//@access public
exports.signUp = asyncHandler(async (req, res, next) => {
  //create user
  const newUser = await user.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  //generate token
  const token = generateToken(newUser._id);
  //return res
  return res.status(201).json({ data: newUser, token });
});

exports.login = asyncHandler(async (req, res, next) => {
  //1-check email exist or no
  const checkUser = await user.findOne({ email: req.body.email });
  //check user and password is valid or not
  //we want to compare password if checkuser be false only
  if (
    !checkUser ||
    !(await bcrypt.compare(req.body.password, checkUser.password))
  ) {
    return next(new ApiError("incorrect email or password", 401));
  }
  //generate token
  const token = generateToken(checkUser._id);
  //return res
  return res.status(201).json({ data: checkUser, token });
});

//make sure that user is logged in
exports.protect = asyncHandler(async (req, res, next) => {
  //1- check if token exist, if exist catch it
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new ApiError("you must login to access this route", 401));
  }
  //2- verify token and handle token errors
  const decoded = jwt.verify(token, process.env.JWT_SECERT);

  //3-check if user is exist or not
  const checkUser = await user.findById(decoded.userId);
  if (!checkUser) {
    return next(
      new ApiError("the user that belongs to this token no longer exist", 401)
    );
  }
  //4-check if user change password after generate its token
  const changPasswordTime = parseInt(
    checkUser.changePasswordAt.getTime() / 1000,
    10
  );
  if (changPasswordTime > decoded.iat) {
    return next(
      new ApiError(
        "user recently changed his password, please login again",
        401
      )
    );
  }

  req.user = checkUser;
  next();
});

//chceck premetion of user
exports.isAllowedTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("you don't have permission to access this route", 403)
      );
    }
    next();
  });
