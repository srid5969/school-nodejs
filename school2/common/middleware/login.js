const { request } = require("express");
const users = require("../../src/users/model/users");

module.exports = function (options) {
  return function (req, result, next) {
    let originalUrl = req.originalUrl;
    if (originalUrl == "/user/login" && req.method == "POST") {
      next();
    } else {
      result.send("Not");
    }
  };
};
