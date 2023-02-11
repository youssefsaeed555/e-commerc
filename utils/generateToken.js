const jwt = require("jsonwebtoken");

const generateToken = (payload) =>
  jwt.sign({ userId: payload }, process.env.JWT_SECERT, {
    expiresIn: process.env.JWT_EXPIRE,
  });

module.exports = generateToken;
