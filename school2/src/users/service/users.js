const bcrypt = require("bcrypt");
const users = require("../model/users");

exports.getAll = () => {
  // return users.find({},{ projection: { _id: 0 } })
  return users.find();
  //.select(" email firstName lastName phone phoneCode gender status");
};

exports.register = (datas) => {
  const data = new users(datas);
  return data.save();
};
exports.userlogin = function (data) {
  return data;
};
exports.update = async (datas, user) => {
  return await users.updateOne({ _id: user }, datas);
};
exports.deleteByEmail = async (user) => {
  const data = await users.deleteOne({ _id: user });
  return data;
};
