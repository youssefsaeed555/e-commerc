// eslint-disable-next-line node/no-extraneous-require
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const factoryHandler = require("./factory_handler");
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
