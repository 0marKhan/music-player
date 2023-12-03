// for functions that we need in many places
const jwt = require("jsonwebtoken");

exports = {};

exports.getToken = async (email, user) => {
  const token = jwt.sign({ identifier: user._id }, "secretKey");
  return token;
};

module.exports = exports;
